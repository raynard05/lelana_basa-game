'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/app/actions/auth';
import { saveUlasan } from '@/utils/ulasanStorage';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Timer from '@/components/Timer';
import confetti from 'canvas-confetti';

import './babak5.css';

export default function Babak5Page1Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showPopup, setShowPopup] = useState<'pop_25' | 'pop_50' | 'pop_75' | 'pop_100' | 'pop_cobalagi' | 'pop_salah' | 'pop_streak' | 'timeout' | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [hasStreakPending, setHasStreakPending] = useState(false);
  
  // NEW STATE FOR 3 STEPS
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const proceedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

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

  useEffect(() => {
    return () => {
      if (proceedTimeoutRef.current) {
        clearTimeout(proceedTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let applauseAudio: HTMLAudioElement | null = null;
    let applauseTimeout: NodeJS.Timeout | null = null;

    if (showPopup && ['pop_25', 'pop_50', 'pop_75', 'pop_100'].includes(showPopup)) {
      const audio = new Audio('/main/MP3_soundeffect/correct_soundeffect.wav');
      audio.play().catch((err) => console.log('Correct sound playback failed:', err));
      
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
      applauseAudio = new Audio('/main/MP3_soundeffect/aplause.mp3');
      applauseAudio.play().catch((err) => console.log('Applause sound playback failed:', err));

      applauseTimeout = setTimeout(() => {
        if (applauseAudio) {
          applauseAudio.pause();
          applauseAudio.currentTime = 0;
        }
      }, 4000);

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

    return () => {
      if (applauseTimeout) clearTimeout(applauseTimeout);
      if (applauseAudio) {
        applauseAudio.pause();
        applauseAudio.currentTime = 0;
      }
    };
  }, [showPopup]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_score', '0');
      localStorage.setItem('game_streak', '0');
      
      const timerKeys = [
        'babak5_page1_timer_expiration',
        'babak5_page1_timer_paused_time'
      ];
      timerKeys.forEach(key => localStorage.removeItem(key));
    }
  }, []);

  const handleTimeOut = () => {
    if (isLocked || showPopup) return;
    setIsLocked(true);
    setShowPopup('timeout');

    proceedTimeoutRef.current = setTimeout(() => {
      handleProceed();
    }, 2000);
  };

  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          bgImage: '/main_frame/relasi.webp',
          title: 'Relasi Sosial',
          options: [
            { id: 'Cedhak', label: 'Cedhak' },
            { id: 'Sedheng', label: 'Sedheng' },
            { id: 'Adoh', label: 'Adoh' }
          ],
          correctId: 'Sedheng'
        };
      case 2:
        return {
          bgImage: '/main_frame/pakurmatan.webp',
          title: 'Tingkat Pakurmatan',
          options: [
            { id: 'Dhuwur', label: 'Dhuwur' },
            { id: 'Sedheng', label: 'Sedheng' },
            { id: 'Asor', label: 'Asor' }
          ],
          correctId: 'Sedheng'
        };
      case 3:
        return {
          bgImage: '/main_frame/drajatsosial.webp',
          title: 'Drajat Sosial',
          options: [
            { id: 'Tuwa', label: 'Tuwa' },
            { id: 'Remaja', label: 'Remaja' },
            { id: 'Bocah', label: 'Bocah' }
          ],
          correctId: 'Remaja'
        };
      default:
        return {
          bgImage: '/main_frame/relasi.webp',
          title: '',
          options: [],
          correctId: ''
        };
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (isLocked) return;
    setIsLocked(true);
    setSelectedOption(optionId);

    const stepConfig = getStepConfig();
    const correct = optionId === stepConfig.correctId;
    setIsAnswerCorrect(correct);

    const questionText = 'Analisis paraga Surontanu - ' + stepConfig.title;
    const userAns = stepConfig.options.find(o => o.id === optionId)?.label || optionId;
    const correctAns = stepConfig.options.find(o => o.id === stepConfig.correctId)?.label || stepConfig.correctId;
    
    let __scoreText = 'skor : 0';
    if (correct && typeof window !== 'undefined') {
       const __tmpEarned = (attempts === 1 ? 50 : 25);
       __scoreText = "skor : " + __tmpEarned;
    }
    saveUlasan(questionText, userAns, correctAns, __scoreText);

    if (correct && typeof window !== 'undefined') {
      const earned = attempts === 1 ? 50 : 25;
      
      const currentScore = parseInt(localStorage.getItem('game_score') || '0', 10);
      localStorage.setItem('game_score', (currentScore + earned).toString());
      
      setTimeout(() => {
        setShowPopup("pop_" + earned as any);

        proceedTimeoutRef.current = setTimeout(() => {
          handleNextStep();
        }, 4000);
      }, 1000);
    } else {
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
        } else if (attempts === 2) {
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {
            setAttempts(3);
            setIsLocked(false);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setShowPopup(null);
          }, 2500);
        } else {
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {
            handleNextStep();
          }, 2000);
        }
      }, 1000);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
      setAttempts(1);
      setIsLocked(false);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setShowPopup(null);
    } else {
      handleProceed();
    }
  };

  const handleOverlayClick = () => {
    if (proceedTimeoutRef.current) {
      clearTimeout(proceedTimeoutRef.current);
    }
    
    if (showPopup === 'pop_100' && hasStreakPending) {
      setHasStreakPending(false);
      setShowPopup('pop_streak');
      
      proceedTimeoutRef.current = setTimeout(() => {
        handleNextStep();
      }, 4000);
    } else {
      if (['pop_25', 'pop_50', 'pop_75', 'pop_100'].includes(showPopup as string) || (showPopup === 'pop_salah' && attempts === 3) || showPopup === 'timeout') {
         handleNextStep();
      } else {
        if (showPopup === 'pop_cobalagi' || (showPopup === 'pop_salah' && attempts < 3)) {
          setAttempts(attempts + 1);
          setIsLocked(false);
          setSelectedOption(null);
          setIsAnswerCorrect(null);
          setShowPopup(null);
        }
      }
    }
  };

  const handleProceed = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babak5_page1_timer_expiration');
      localStorage.removeItem('babak5_page1_timer_paused_time');
    }
    router.push('/babak5/page2_narration');
  };

  if (isValidating) {
    return (
      <div className="babak5-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  const stepConfig = getStepConfig();

  return (
    <div className="babak5-container">
      <Home className="babak5-nav-btn babak5-home-btn" />

      <Timer
        initialTime={120}
        isLocked={isLocked || !!showPopup}
        onTimeOut={handleTimeOut}
        storageKey="babak5_page1_timer"
      />

      <Music className="babak5-nav-btn babak5-music-btn" />
      
      <div className="babak5-card-frame" style={{ backgroundImage: "url('" + stepConfig.bgImage + "')" }}>
        <div className="babak5-card-content-layout">

          <div className="babak5-column-left">
            <Image
              src="/all_characters/character_babak5.webp"
              alt="Surontanu"
              width={100}
              height={100}
              className="babak5-avatar-image-el"
              priority
              unoptimized
            />
          </div>

          <div className="babak5-column-right">
           <div className="babak5-options-container">
              {stepConfig.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                let btnClass = "babak5-option-btn babak5-opt-" + opt.id;

                if (isSelected) {
                  if (isAnswerCorrect) {
                    btnClass += " babak5-correct-option";
                  } else if (isAnswerCorrect === false) {
                    btnClass += " babak5-incorrect-option";
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

      <div className="babak5-bottom-banner">
        <div className="babak5-banner-content-layout">

        </div>
      </div>

      {showPopup && (
        <div className={"babak5-popup-overlay " + (showPopup === 'pop_streak' ? 'streak-popup-overlay' : '')} onClick={handleOverlayClick} style={{ cursor: 'pointer' }}>
          <div className={"babak5-popup-card " + (showPopup === 'pop_streak' ? 'streak-popup-card' : '')}>
            <Image
              src={
                showPopup === 'timeout'
                  ? '/main/pop_up/pop_waktuhabis1.webp'
                  : "/main/pop_up/" + showPopup + ".png"
              }
              alt={showPopup}
              width={320}
              height={240}
              className="babak5-popup-image"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}