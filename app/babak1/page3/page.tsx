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

import './page3.css';

const optionsData: OptionData[] = [
  {
    id: 'A',
    text: 'Senadyan aku ora ngerti sapa bapakku, aku rak ya ora tau milara marang kowe.',
    audioUrl: '/audio/MP3 BABAK 1/3. Ngoko Lugu babak 1.mp3',
  },
  {
    id: 'B',
    text: 'Senadyan aku ora ngerti sapa bapakku, aku rak ya ora tau gawe milara marang panjenengan.',
    audioUrl: '/audio/MP3 BABAK 1/4. Ngoko Alus babak 1.mp3',
  },
  {
    id: 'C',
    text: 'Senadyan kula mboten ngertos sinten bapak kula, kula rak nggih mboten nate damel milala dhateng sampeyan.',
    audioUrl: '/audio/MP3 BABAK 1/5. krama lugu babak 1.mp3',
  },
  {
    id: 'D',
    text: 'Senadyan kula mboten ngertos sinten rama kula, kula rak nggih mboten nate damel milara dhumateng panjenengan.',
    audioUrl: '/audio/MP3 BABAK 1/6. krama alus babak 1.mp3',
  },
];

export default function Babak1Page3() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);
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

    if (correct) {
      const newScore = score + 100;
      setScore(newScore);
      if (typeof window !== 'undefined') {
        localStorage.setItem('game_score', newScore.toString());
      }
    }

    setTimeout(() => {
      const type = correct ? 'correct' : 'incorrect';
      setShowPopup(type);

      proceedTimeoutRef.current = setTimeout(() => {
        handleProceed();
      }, correct ? 4000 : 2000); // 4-second delay for correct, 2-second for incorrect
    }, 1000);
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
    handleProceed();
  };

  const handleProceed = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babak1_page3_timer_expiration');
      localStorage.removeItem('babak1_page3_timer_paused_time');
    }
    router.push('/game'); // End of Babak 1, proceed to general game hub
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

      {/* Top Center Timer */}
      <Timer
        initialTime={3600}
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
            dialogueText="Aja cedhak-cedhak aku! Kana lunga, aku ora sudi srawung karo bocah lola sing ora duwe bapak kaya kowe!"
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
          style={{ width: '220px', height: '60px' }}
        />
        {/* Listen Button for Jaka Slewah's spoken dialogue */}
        <ListenButton
          audioUrl="/audio/MP3 BABAK 1/2. Jaka slewah 1.mp3"
          disabled={isLocked}
          style={{ width: '220px', height: '60px' }}
        />
      </div>

      {/* Popup modal result cards */}
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
