'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Timer from '@/components/Timer';
import confetti from 'canvas-confetti';

import './babak2.css';

export default function Babak2Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showPopup, setShowPopup] = useState<'pop_25' | 'pop_50' | 'pop_75' | 'pop_100' | 'pop_cobalagi' | 'pop_salah' | 'pop_streak' | 'timeout' | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [hasStreakPending, setHasStreakPending] = useState(false);
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
    let applauseAudio: HTMLAudioElement | null = null;
    let applauseTimeout: NodeJS.Timeout | null = null;

    if (showPopup && ['pop_25', 'pop_50', 'pop_75', 'pop_100'].includes(showPopup)) {
      const audio = new Audio('/main/MP3_soundeffect/correct_soundeffect.wav');
      audio.play().catch((err) => console.log('Correct sound playback failed:', err));
      
      // Trigger confetti
      if (showPopup === 'pop_100') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF4500', '#9400D3'],
          zIndex: 9999999
        });
      }
    } else if (showPopup === 'pop_streak') {
      // Play applause for streak popup
      applauseAudio = new Audio('/main/MP3_soundeffect/aplause.mp3');
      applauseAudio.play().catch((err) => console.log('Applause sound playback failed:', err));

      applauseTimeout = setTimeout(() => {
        if (applauseAudio) {
          applauseAudio.pause();
          applauseAudio.currentTime = 0;
        }
      }, 4000);

      // Trigger premium gold confetti
      const end = Date.now() + 3000;
      const colors = ['#FFD700', '#FFA500', '#FFF8E1', '#F0B863', '#ECC560'];
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors,
          shapes: ['star', 'circle', 'square'],
          scalar: 1.2,
          zIndex: 9999999
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors,
          shapes: ['star', 'circle', 'square'],
          scalar: 1.2,
          zIndex: 9999999
        });
        if (Math.random() < 0.1) {
          confetti({
            particleCount: 8,
            angle: 270,
            spread: 80,
            origin: { x: Math.random(), y: 0 },
            colors: colors,
            shapes: ['star'],
            scalar: 1.5,
            gravity: 0.6,
            drift: Math.random() * 2 - 1,
            zIndex: 9999999
          });
        }
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (showPopup && ['pop_cobalagi', 'pop_salah', 'timeout'].includes(showPopup)) {
      const audio = new Audio('/main/MP3_soundeffect/wrong_soundeffect.mp3');
      audio.play().catch((err) => console.log('Wrong sound playback failed:', err));
    }

    // Cleanup audio playback on change or unmount
    return () => {
      if (applauseTimeout) clearTimeout(applauseTimeout);
      if (applauseAudio) {
        applauseAudio.pause();
        applauseAudio.currentTime = 0;
      }
    };
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
    if (isLocked) return;
    setIsLocked(true);
    setSelectedOption(optionId);

    const correct = optionId === 'luwih_tuwa';
    setIsAnswerCorrect(correct);

    if (correct && typeof window !== 'undefined') {
      const earned = attempts === 1 ? 100 : 75;
      const currentScore = parseInt(localStorage.getItem('game_score') || '0', 10);
      
      if (earned === 100) {
        const currentStreak = parseInt(localStorage.getItem('game_streak') || '0', 10) + 1;
        localStorage.setItem('game_streak', currentStreak.toString());
        
        if (currentStreak === 3) {
          localStorage.setItem('game_score', (currentScore + earned + 25).toString());
          localStorage.setItem('game_streak', '0');
          setHasStreakPending(true);
          
          setTimeout(() => {
            setShowPopup('pop_100');
            
            proceedTimeoutRef.current = setTimeout(() => {
              setHasStreakPending(false);
              setShowPopup('pop_streak');
              
              proceedTimeoutRef.current = setTimeout(() => {
                handleProceed();
              }, 4000);
            }, 4000);
          }, 1000);
          return;
        }
      } else {
        localStorage.setItem('game_streak', '0');
      }

      localStorage.setItem('game_score', (currentScore + earned).toString());
      
      setTimeout(() => {
        setShowPopup(`pop_${earned}` as any);

        proceedTimeoutRef.current = setTimeout(() => {
          handleProceed();
        }, 4000);
      }, 1000);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('game_streak', '0');
      }
      setTimeout(() => {
        if (attempts === 1) {
          setShowPopup('pop_cobalagi');
          proceedTimeoutRef.current = setTimeout(() => {
            setAttempts(2);
            setIsLocked(false);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setShowPopup(null);
          }, 2500);
        } else {
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {
            handleProceed();
          }, 2000);
        }
      }, 1000);
    }
  };

  const handleOverlayClick = () => {
    if (proceedTimeoutRef.current) {
      clearTimeout(proceedTimeoutRef.current);
    }
    
    if (showPopup === 'pop_cobalagi') {
      setAttempts(2);
      setIsLocked(false);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setShowPopup(null);
    } else if (showPopup === 'pop_100' && hasStreakPending) {
      setHasStreakPending(false);
      setShowPopup('pop_streak');
      
      proceedTimeoutRef.current = setTimeout(() => {
        handleProceed();
      }, 4000);
    } else {
      handleProceed();
    }
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
                let btnClass = `babak2-option-btn babak2-opt-${opt.id}`;

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
        <div className={`babak2-popup-overlay ${showPopup === 'pop_streak' ? 'streak-popup-overlay' : ''}`} onClick={handleOverlayClick} style={{ cursor: 'pointer' }}>
          <div className={`babak2-popup-card ${showPopup === 'pop_streak' ? 'streak-popup-card' : ''}`}>
            <Image
              src={
                showPopup === 'timeout'
                  ? '/main/pop_up/pop_waktuhabis1.webp'
                  : `/main/pop_up/${showPopup}.png`
              }
              alt={showPopup}
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
