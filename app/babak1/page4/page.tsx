'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Timer from '@/components/Timer';
import GameStatusHeader from '@/components/GameStatusHeader';
import DialogBubble from '@/components/DialogBubble';
import UnggahUngguhOptions, { OptionData } from '@/components/UnggahUngguhOptions';
import RecordButton from '@/components/RecordButton';
import ListenButton from '@/components/ListenButton';
import Music from '@/components/Music';
import confetti from 'canvas-confetti';

import './page4.css';


export default function Babak1Page4() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState<'pop_25' | 'pop_50' | 'pop_75' | 'pop_100' | 'pop_cobalagi' | 'pop_salah' | 'pop_streak' | 'timeout' | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [hasStreakPending, setHasStreakPending] = useState(false);
  const [transcriptFeedback, setTranscriptFeedback] = useState<string | null>(null);

  const proceedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Load score from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('game_score');
      if (savedScore !== null) {
        setScore(parseInt(savedScore, 10));
      }
    }
  }, []);

  // 1. Session verification check on mount
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
        console.error('Auth verification check error:', err);
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (proceedTimeoutRef.current) clearTimeout(proceedTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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

  const handleTimeOut = () => {
    if (isLocked || showPopup) return;
    setIsLocked(true);
    setShowPopup('timeout');

    proceedTimeoutRef.current = setTimeout(() => {
      handleProceed();
    }, 2000);
  };

  const handleTranscript = (text: string) => {
    if (isLocked) return;
    setTranscriptFeedback(text);

    // Auto clear feedback text after 5 seconds
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setTranscriptFeedback(null);
    }, 5000);

    // Helper to normalize words (lowercase, remove accents, and strip punctuation)
    const normalizeWord = (w: string) => {
      return w
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "")
        .trim();
    };

    // Words from transcript
    const words = text.split(/\s+/).map(normalizeWord).filter(Boolean);

    // Allowed target words (supporting both 'amerga' and 'amarga' spelling)
    const targetWords = ['aku', 'luput', 'apa', 'marang', 'kowe', "opo", "salahku", "nyapo","ogak", "gak", "gelem", "dadi", "kancaku", "iyo", "wis", "salah", 'iya', 'Ora', "kancoku", "yo"];
    // Check count of target words spoken
    const uniqueMatched = Array.from(new Set(words.filter(word => targetWords.includes(word))));
    const matchedCount = uniqueMatched.length;

    setIsLocked(true);

    let earnedPoints = 0;
    if (attempts === 1) {
      if (matchedCount === 1) {
        earnedPoints = 50;
      } else if (matchedCount === 2) {
        earnedPoints = 75;
      } else if (matchedCount > 2) {
        earnedPoints = 100;
      }
    } else { // attempts === 2
      if (matchedCount === 1) {
        earnedPoints = 25;
      } else if (matchedCount === 2) {
        earnedPoints = 50;
      } else if (matchedCount > 2) {
        earnedPoints = 75;
      }
    }

    const correct = earnedPoints > 0;
    setIsAnswerCorrect(correct);

    if (correct && typeof window !== 'undefined') {
      if (earnedPoints === 100) {
        const currentStreak = parseInt(localStorage.getItem('game_streak') || '0', 10) + 1;
        localStorage.setItem('game_streak', currentStreak.toString());

        if (currentStreak === 3) {
          const newScore = score + earnedPoints + 25;
          setScore(newScore);
          localStorage.setItem('game_score', newScore.toString());
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

      const newScore = score + earnedPoints;
      setScore(newScore);
      localStorage.setItem('game_score', newScore.toString());

      setTimeout(() => {
        setShowPopup(`pop_${earnedPoints}` as any);

        proceedTimeoutRef.current = setTimeout(() => {
          handleProceed();
        }, 4000); // 4-second delay for correct popup
      }, 1000);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('game_streak', '0');
      }
      // Failed attempt (0 words matched)
      setTimeout(() => {
        if (attempts === 1) {
          setShowPopup('pop_cobalagi');
          proceedTimeoutRef.current = setTimeout(() => {
            setAttempts(2);
            setIsLocked(false);
            setShowPopup(null);
            setIsAnswerCorrect(null);
          }, 2500);
        } else {
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {
            handleProceed();
          }, 2000); // 2-second delay for incorrect popup on 2nd attempt
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
      setShowPopup(null);
      setIsAnswerCorrect(null);
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
      localStorage.removeItem('babak1_page4_timer_expiration');
      localStorage.removeItem('babak1_page4_timer_paused_time');
    }
    router.push('/babak1/page5'); // End of Babak 1, proceed to general game hub
  };

  if (isValidating) {
    return (
      <div className="page4-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="page4-container">
      {/* Top Left Home Button */}
      <Home className="nav4-btn home4-btn" />

      {/* Top Right Music Toggle Button */}
      <Music className="nav4-btn music4-btn" />

      {/* Top Center Timer */}
      <Timer
        initialTime={3600}
        isLocked={isLocked || !!showPopup}
        onTimeOut={handleTimeOut}
        storageKey="babak1_page4_timer"
      />

      {/* Top Right Game Status Header */}
      <div className="status-header-page4">
        <GameStatusHeader
          babak={1}
          misi={2}
          score={score}
        />
      </div>

      {/* Character Portrait & Speech Bubble Row */}
      <div className="character-dialog-row">
        <div className="character-portrait-container">
          <Image
            src="/babak1/pages_4_assets/character1.webp"
            alt="Jaka Slewah"
            width={500}
            height={500}
            className="character-portrait"
            priority
            unoptimized
          />
        </div>
        <div className="dialog-bubble-wrapper dialog-bubble-wrapper-page4">
          <DialogBubble
            actorName="Jaka Slewah"
            dialogueText="Halah, rasah omong! Pokoké, aku emoh dadi kancamu!"
            speakerPosition="left"
            className="dialog-bubble-container-page4"
          />
        </div>
      </div>

      {/* Character 2 Portrait Container (Lelana - positioned absolutely on the right) */}
      <div className="character2-absolute-container">
        <Image
          src="/babak1/pages_4_assets/character2.webp"
          alt="Lelana"
          width={500}
          height={500}
          className="character2-portrait"
          priority
          unoptimized
        />
      </div>

      {/* Real-time speech transcript feedback overlay */}
      {transcriptFeedback && (
        <div className="transcript-feedback">
          Swara sampeyan: "{transcriptFeedback}"
        </div>
      )}

      {/* Bottom Action Row (Record & Listen buttons) */}
      <div className="bottom-actions-row">
        {/* Listen Button for Jaka Slewah's spoken dialogue */}
        <ListenButton
          audioUrl="/audio/babak1/8. Jaka slewah 2.mp3"
          disabled={isLocked}
        />
        {/* Record Button for STT practice */}
        <RecordButton
          onTranscript={handleTranscript}
          lang="jv-ID"
          disabled={isLocked}
        />
      </div>

      {/* Popup modal result cards */}
      {showPopup && (
        <div className={`popup-overlay ${showPopup === 'pop_streak' ? 'streak-popup-overlay' : ''}`} onClick={handleOverlayClick} style={{ cursor: 'pointer' }}>
          <div className={`popup-card ${showPopup === 'pop_streak' ? 'streak-popup-card' : ''}`}>
            <Image
              src={
                showPopup === 'timeout'
                  ? '/main/pop_up/pop_waktuhabis1.webp'
                  : `/main/pop_up/${showPopup}.png`
              }
              alt={showPopup}
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
