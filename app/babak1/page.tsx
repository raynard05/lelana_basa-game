'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './babak1.css';

export default function Babak1Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showPopup, setShowPopup] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);
  const proceedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // 1. Session check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push('/');
        } else {
          setCurrentUser(user);
          setIsValidating(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  // 2. Ticking Countdown Timer logic
  useEffect(() => {
    if (isValidating || isAnswerCorrect || isLocked || showPopup) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isValidating, isAnswerCorrect, isLocked, showPopup]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (proceedTimeoutRef.current) {
        clearTimeout(proceedTimeoutRef.current);
      }
    };
  }, []);

  // 3. Trigger when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !isLocked && !showPopup) {
      setIsLocked(true);
      setShowPopup('timeout');
      
      // Auto-proceed to the next page after 2 seconds
      proceedTimeoutRef.current = setTimeout(() => {
        handleProceed();
      }, 2000);
    }
  }, [timeLeft, isLocked, showPopup]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (optionId: string) => {
    if (isLocked) return; // Allow only 1 attempt per question round
    setIsLocked(true);
    setSelectedOption(optionId);

    const correct = optionId === 'sapantaran';
    setIsAnswerCorrect(correct);

    setTimeout(() => {
      const type = correct ? 'correct' : 'incorrect';
      setShowPopup(type);
      
      // Auto-proceed to the next page after 2 seconds
      proceedTimeoutRef.current = setTimeout(() => {
        handleProceed();
      }, 2000);
    }, 1000); // 1 second delay
  };

  const handleOverlayClick = () => {
    if (proceedTimeoutRef.current) {
      clearTimeout(proceedTimeoutRef.current);
    }
    handleProceed();
  };

  const handleProceed = () => {
    router.push('/game');
  };

  if (isValidating) {
    return (
      <div className="babak1-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  const options = [
    { id: 'luwih_tuwa', label: 'Luwih tuwa' },
    { id: 'sapantaran', label: 'Sapantaran' },
    { id: 'luwih_enom', label: 'Luwih enom' }
  ];

  return (
    <div className="babak1-container">
      {/* Top Controls */}
      <Home className="nav-btn home-btn" />

      <div className="timer-badge">
        <Clock className="timer-icon" size={20} />
        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Skip button replaced by Music Component */}
      <Music className="nav-btn music-btn" />

      {/* Main Analysis Card */}
      <div className="card-frame">
        <div className="card-content-layout">

          {/* Left Column: Portrait & metadata */}
          <div className="column-left">

            <Image
              src="/babak1/pages_1_assets/aktor_npc.png"
              alt="Jaka Slewah"
              width={100}
              height={100}
              className="avatar-image-el"
              priority
              unoptimized
            />


          </div>

          {/* Right Column: Title & choices */}
          <div className="column-right">


            <div className="options-container">
              {options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                let btnClass = "option-btn";

                if (isSelected) {
                  if (isAnswerCorrect) {
                    btnClass += " correct-option";
                  } else if (isAnswerCorrect === false) {
                    btnClass += " incorrect-option";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.id)}
                    className={btnClass}
                    disabled={isLocked}
                    type="button"
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Subtitle / Instruction Banner */}
      <div className="bottom-banner">
        <div className="banner-content-layout">

        </div>
      </div>

      {/* Delayed Popup Modals */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleOverlayClick} style={{ cursor: 'pointer' }}>
          <div className="popup-card">
            <Image
              src={
                showPopup === 'correct'
                  ? '/main/pop_up/pop_100.png'
                  : showPopup === 'incorrect'
                  ? '/main/pop_up/pop_salah.png'
                  : '/main/pop_up/pop_waktuhabis1.webp'
              }
              alt={showPopup === 'correct' ? 'Bener' : showPopup === 'incorrect' ? 'Kleru' : 'Waktu Habis'}
              width={320}
              height={240}
              className="popup-image"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
