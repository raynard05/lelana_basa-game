'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Timer from '@/components/Timer';

import './babak2.css';

export default function Babak2Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (proceedTimeoutRef.current) {
        clearTimeout(proceedTimeoutRef.current);
      }
    };
  }, []);

  // Play sound effects when popups appear
  useEffect(() => {
    if (showPopup === 'correct') {
      const audio = new Audio('/main/MP3_soundeffect/correct_soundeffect.wav');
      audio.play().catch((err) => console.log('Correct sound playback failed:', err));
    } else if (showPopup === 'incorrect' || showPopup === 'timeout') {
      const audio = new Audio('/main/MP3_soundeffect/wrong_soundeffect.mp3');
      audio.play().catch((err) => console.log('Wrong sound playback failed:', err));
    }
  }, [showPopup]);

  // Clear all timer keys from previous sessions to prevent sudden timeout bugs on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timerKeys = [
        'babak2_page1_timer_expiration',
        'babak2_page1_timer_paused_time',
        'babak2_page3_timer_expiration',
        'babak2_page3_timer_paused_time',
        'babak2_page4_timer_expiration',
        'babak2_page4_timer_paused_time',
      ];
      timerKeys.forEach(key => localStorage.removeItem(key));
    }
  }, []);

  const handleTimeOut = () => {
    if (isLocked || showPopup) return;
    setIsLocked(true);
    setShowPopup('timeout');

    // Auto-proceed to the next page after 2 seconds
    proceedTimeoutRef.current = setTimeout(() => {
      handleProceed();
    }, 2000);
  };

  const handleOptionClick = (optionId: string) => {
    if (isLocked) return; // Allow only 1 attempt per question round
    setIsLocked(true);
    setSelectedOption(optionId);

    const correct = optionId === 'luwih_tuwa';
    setIsAnswerCorrect(correct);

    if (correct && typeof window !== 'undefined') {
      const currentScore = parseInt(localStorage.getItem('game_score') || '0', 10);
      localStorage.setItem('game_score', (currentScore + 100).toString());
    }

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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babak2_page1_timer_expiration');
      localStorage.removeItem('babak2_page1_timer_paused_time');
    }
    router.push('/babak2/page2_narration');
  };

  if (isValidating) {
    return (
      <div className="babak2-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    <div className="babak2-container">
      {/* Top Controls */}
      <Home className="babak2-nav-btn babak2-home-btn" />

      <Timer
        initialTime={3600}
        isLocked={isLocked || !!showPopup}
        onTimeOut={handleTimeOut}
        storageKey="babak2_page1_timer"
      />

      {/* Skip button replaced by Music Component */}
      <Music className="babak2-nav-btn babak2-music-btn" />

      {/* Main Analysis Card */}
      <div className="babak2-card-frame">
        <div className="babak2-card-content-layout">

          {/* Left Column: Portrait & metadata */}
          <div className="babak2-column-left">
            <Image
              src="/babak2/page_1_assets/character_1.webp"
              alt="Karakter"
              width={100}
              height={100}
              className="babak2-avatar-image-el"
              priority
              unoptimized
            />
          </div>

          {/* Right Column: Title & choices */}
          <div className="babak2-column-right">
            <div className="babak2-options-container">
              {options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                let btnClass = "babak2-option-btn";

                if (isSelected) {
                  if (isAnswerCorrect) {
                    btnClass += " babak2-correct-option";
                  } else if (isAnswerCorrect === false) {
                    btnClass += " babak2-incorrect-option";
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
      <div className="babak2-bottom-banner">
        <div className="babak2-banner-content-layout">
          {/* Subtitle text if needed */}
        </div>
      </div>

      {/* Delayed Popup Modals */}
      {showPopup && (
        <div className="babak2-popup-overlay" onClick={handleOverlayClick} style={{ cursor: 'pointer' }}>
          <div className="babak2-popup-card">
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
              className="babak2-popup-image"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
