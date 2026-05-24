'use client';

import { useState, useEffect } from 'react';
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
    if (isValidating || isAnswerCorrect) return;

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
  }, [isValidating, isAnswerCorrect]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (optionId: string) => {
    if (isAnswerCorrect) return; // Prevent clicking after correct answer

    setSelectedOption(optionId);

    // Correct answer is "sapantaran" (Jaka Slewah is a childhood friend, 15 years old)
    if (optionId === 'sapantaran') {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
      // Reset incorrect state after a short shake duration to allow re-trying
      setTimeout(() => {
        setIsAnswerCorrect(null);
        setSelectedOption(null);
      }, 800);
    }
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
            <div className="avatar-border1">
              <Image
                src="/babak1/pages_1_assets/aktor_npc.png"
                alt="Jaka Slewah"
                width={200}
                height={200}
                className="avatar-image-el"
                priority
                unoptimized
              />
            </div>

          </div>

          {/* Right Column: Title & choices */}
          <div className="column-right">


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
                  disabled={isAnswerCorrect === true}
                  type="button"
                >
                  {opt.label}
                </button>
              );
            })}

            {/* Proceed Button container is always rendered to prevent layout shift */}
            <div
              className="proceed-container"
              style={{
                visibility: isAnswerCorrect ? 'visible' : 'hidden',
                opacity: isAnswerCorrect ? 1 : 0,
                pointerEvents: isAnswerCorrect ? 'auto' : 'none',
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              <button
                onClick={handleProceed}
                className="proceed-btn"
                type="button"
                disabled={!isAnswerCorrect}
              >
                <span>Nerusake Misi</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Subtitle / Instruction Banner */}
      <div className="bottom-banner">
        <div className="banner-content-layout">
        </div>
      </div>
    </div>
  );
}
