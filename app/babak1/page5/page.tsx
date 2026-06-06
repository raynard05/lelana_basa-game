'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Timer from '@/components/Timer';
import GameStatusHeader from '@/components/GameStatusHeader';
import DialogBubble from '@/components/DialogBubble';
import RecordButton from '@/components/RecordButton';
import ListenButton from '@/components/ListenButton';
import Music from '@/components/Music';

import './page5.css';

export default function Babak1Page5() {
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
    const targetWords = ['aku', 'iya', 'bakal', 'lunga', 'saiki', 'tak', 'nyingkrih', 'ngalih', "iyo", "yo", "wes" ,"wis", "ya"];

    // Check count of target words spoken
    const matchedCount = words.filter(word => targetWords.includes(word)).length;
    const correct = matchedCount >= 2;

    setIsLocked(true);
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

  const handleOverlayClick = () => {
    if (proceedTimeoutRef.current) {
      clearTimeout(proceedTimeoutRef.current);
    }
    handleProceed();
  };

  const handleProceed = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babak1_page5_timer_expiration');
      localStorage.removeItem('babak1_page5_timer_paused_time');
    }
    router.push('/babak2/page1'); // End of Babak 1, proceed to Babak 2 Page 1
  };

  if (isValidating) {
    return (
      <div className="page5-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="page5-container">
      {/* Top Left Home Button */}
      <Home className="nav5-btn home5-btn" />

      {/* Top Right Music Toggle Button */}
      <Music className="nav5-btn music5-btn" />

      {/* Top Center Timer */}
      <Timer
        initialTime={6300}
        isLocked={isLocked || !!showPopup}
        onTimeOut={handleTimeOut}
        storageKey="babak1_page5_timer"
      />

      {/* Top Right Game Status Header */}
      <div className="status-header-page5">
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
            src="/babak1/pages_5_assets/character1.webp"
            alt="Jaka Slewah"
            width={500}
            height={500}
            className="character-portrait"
            priority
            unoptimized
          />
        </div>
        <div className="dialog-bubble-wrapper dialog-bubble-wrapper-page5">
          <DialogBubble
            actorName="Jaka Slewah"
            dialogueText="Wis, ndang ngaliha, golekana dhisik sapa bapakmu!"
            speakerPosition="left"
            className="dialog-bubble-container-page5"
          />
        </div>
      </div>

      {/* Character 2 Portrait Container (Lelana - positioned absolutely on the right) */}
      <div className="character2-absolute-container">
        <Image
          src="/babak1/pages_5_assets/character2.webp"
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
          audioUrl="/audio/MP3 BABAK 1/soundpage5.mp3"
          disabled={isLocked}
          style={{ width: '260px', height: '70px' }}
        />
        {/* Record Button for STT practice */}
        <RecordButton
          onTranscript={handleTranscript}
          lang="jv-ID"
          disabled={isLocked}
          style={{ width: '260px', height: '70px' }}
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
