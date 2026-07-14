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

import './page3.css';

const optionsData: OptionData[] = [
  {
    id: 'A',
    text: "Apa merga aku ora nduwe bapak, banjur awakmu ora gelem kekancan karo aku?",
    audioUrl: '/audio/babak1/4. ngoko lugu babak 1.mp3',
  },
  {
    id: 'B',
    text: "Apa amarga kula ora nduwe bapak, banjur panjenengan ora gelem kekancan karo aku?",
    audioUrl: '/audio/babak1/5. ngoko alus babak 1.mp3',
  },
  {
    id: 'C',
    text: "Menapa amargi kula mboten gadhah bapak, banjur sampeyan mboten purun kekancan kalih kula?",
    audioUrl: '/audio/babak1/6. krama lugu babak 1.mp3',
  },
  {
    id: 'D',
    text: 'Menapa amargi kula mboten gadhah Rama, lajeng panjenengan mboten kersa kekancan kalih kula?',
    audioUrl: '/audio/babak1/7. krama alus babak 1.mp3',
  },
];

export default function Babak1Page3() {
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

  const calculateSimilarity = (str1: string, str2: string): number => {
    const clean = (s: string) => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").trim();
    const s1 = clean(str1);
    const s2 = clean(str2);
    if (s1 === s2) return 1.0;
    if (s1.length === 0 || s2.length === 0) return 0.0;

    const dp = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i++) dp[0][i] = i;
    for (let j = 0; j <= s2.length; j++) dp[j][0] = j;
    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[j][i] = Math.min(
          dp[j][i - 1] + 1,
          dp[j - 1][i] + 1,
          dp[j - 1][i - 1] + cost
        );
      }
    }
    const distance = dp[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    return (maxLength - distance) / maxLength;
  };

  const handleOptionSelect = (id: 'A' | 'B' | 'C' | 'D') => {
    if (isLocked) return;
    setIsLocked(true);
    setSelectedOption(id);

    const correct = id === 'A'; // Ngoko Lugu is correct since Jaka Slewah is a peer (childhood friend)
    setIsAnswerCorrect(correct);

    if (correct && typeof window !== 'undefined') {
      const earned = attempts === 1 ? 100 : 75;

      if (earned === 100) {
        const currentStreak = parseInt(localStorage.getItem('game_streak') || '0', 10) + 1;
        localStorage.setItem('game_streak', currentStreak.toString());

        if (currentStreak === 3) {
          const newScore = score + earned + 25;
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
          }, 1200);
          return;
        }
      } else {
        localStorage.setItem('game_streak', '0');
      }

      const newScore = score + earned;
      setScore(newScore);
      localStorage.setItem('game_score', newScore.toString());

      setTimeout(() => {
        setShowPopup(`pop_${earned}` as any);

        proceedTimeoutRef.current = setTimeout(() => {
          handleProceed();
        }, 4000); // 4 seconds delay for correct popup
      }, 1200);
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
          }, 2000); // 2 seconds delay for incorrect popup on 2nd attempt
        }
      }, 1200);
    }
  };

  const handleTranscript = (text: string) => {
    setTranscriptFeedback(text);

    // Auto clear feedback text after 5 seconds
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setTranscriptFeedback(null);
    }, 5000);

    // Calculate similarity against all options to find 80% match
    let bestOptionId: 'A' | 'B' | 'C' | 'D' | null = null;
    let highestSimilarity = 0;

    optionsData.forEach(opt => {
      const sim = calculateSimilarity(text, opt.text);
      if (sim > highestSimilarity) {
        highestSimilarity = sim;
        bestOptionId = opt.id;
      }
    });

    // Trigger option selection if matching by 80% or more
    if (highestSimilarity >= 0.8 && bestOptionId) {
      handleOptionSelect(bestOptionId);
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
      localStorage.removeItem('babak1_page3_timer_expiration');
      localStorage.removeItem('babak1_page3_timer_paused_time');
    }
    router.push('/babak1/page4'); // End of Babak 1, proceed to general game hub
  };

  if (isValidating) {
    return (
      <div className="page3-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }



  return (
    <div className="page3-container">
      {/* Top Left Home Button */}
      <Home className="nav3-btn home3-btn" />

      {/* Top Right Music Toggle Button */}
      <Music className="nav3-btn music3-btn" />

      {/* Top Center Timer */}
      <Timer
        initialTime={60}
        isLocked={isLocked || !!showPopup}
        onTimeOut={handleTimeOut}
        storageKey="babak1_page3_timer"
      />

      {/* Top Right Game Status Header */}
      <div className="status-header-page3">
        <GameStatusHeader
          babak={1}
          misi={1}
          score={score}
        />
      </div>

      {/* Character Portrait & Speech Bubble Row */}
      <div className="character-dialog-row">
        <div className="character-portrait-container">
          <Image
            src="/babak1/pages_3_assets/character_page3.png"
            alt="Jaka Slewah"
            width={500}
            height={500}
            className="character-portrait"
            priority
            unoptimized
          />
        </div>
        <div className="dialog-bubble-wrapper">
          <DialogBubble
            actorName="Jaka Slewah"
            dialogueText="Aja cedhak-cedhak aku! Aku ora sudi kancanan karo awakmu!"
            speakerPosition="left"
          />
        </div>
      </div>

      {/* Speech Level Choices Grid */}
      <div className="options-wrapper-page3">

        <UnggahUngguhOptions
          options={optionsData}
          selectedId={selectedOption}
          onSelect={handleOptionSelect}
          disabled={isLocked}
          isCorrect={isAnswerCorrect}
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
        {/* Record Button for STT practice */}
        <RecordButton
          onTranscript={handleTranscript}
          lang="jv-ID"
          disabled={isLocked}
        />
        {/* Listen Button for Jaka Slewah's spoken dialogue */}
        <ListenButton
          audioUrl="/audio/babak1/3. Jaka Slewah 1.mp3"
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
