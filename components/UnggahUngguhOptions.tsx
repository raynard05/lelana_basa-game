'use client';

import { useState, useEffect, useRef } from 'react';
import './UnggahUngguhOptions.css';

export interface OptionData {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  audioUrl: string;
}

interface UnggahUngguhOptionsProps {
  options: OptionData[];
  selectedId?: string | null;
  onSelect?: (id: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
  isCorrect?: boolean | null;
}

const TITLES: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'Ngoko Lugu',
  B: 'Ngoko Alus',
  C: 'Krama Lugu',
  D: 'Krama Alus',
};

export default function UnggahUngguhOptions({
  options,
  selectedId,
  onSelect,
  disabled = false,
  isCorrect = null,
}: UnggahUngguhOptionsProps) {
  const [playingId, setPlayingId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        window.dispatchEvent(new Event('resumeBackgroundMusic'));
      }
    };
  }, []);

  // Listen to global pause event to stop option audio when another audio plays or recording starts
  useEffect(() => {
    const handleGlobalPause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setPlayingId(null);
      }
    };

    window.addEventListener('pauseBackgroundMusic', handleGlobalPause);
    return () => {
      window.removeEventListener('pauseBackgroundMusic', handleGlobalPause);
    };
  }, []);

  const playAudio = (id: 'A' | 'B' | 'C' | 'D', audioUrl: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent card selection when clicking the speaker button specifically
    }

    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audio.volume = 1.0; // Set voiceover volume to maximum
    audioRef.current = audio;
    setPlayingId(id);

    // Pause global bg music
    window.dispatchEvent(new Event('pauseBackgroundMusic'));

    audio.play().catch((err) => {
      console.warn('Playback failed:', err);
      setPlayingId(null);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    });

    audio.onended = () => {
      setPlayingId(null);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    };
  };

  const handleCardClick = (id: 'A' | 'B' | 'C' | 'D', audioUrl: string) => {
    if (disabled) return;
    playAudio(id, audioUrl);
  };

  return (
    <div className="unggah-ungguh-container">
      <div className="unggah-ungguh-grid">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isPlaying = playingId === opt.id;
          let statusClass = '';
          if (isSelected) {
            if (isCorrect === true) {
              statusClass = 'correct';
            } else if (isCorrect === false) {
              statusClass = 'incorrect';
            } else {
              statusClass = 'selected';
            }
          }

          return (
            <div
              key={opt.id}
              className={`speech-level-card ${statusClass} ${disabled ? 'disabled' : ''}`}
              onClick={() => handleCardClick(opt.id, opt.audioUrl)}
            >
              <div className="letter-badge">{opt.id}</div>
              <div className="card-text-section">
                <h4 className="speech-title">{TITLES[opt.id]}</h4>
                <p className="speech-quote">"{opt.text}"</p>
              </div>
              <button
                type="button"
                className={`speaker-button ${isPlaying ? 'playing' : ''}`}
                onClick={(e) => playAudio(opt.id, opt.audioUrl, e)}
                disabled={disabled}
                aria-label={`Play audio for ${TITLES[opt.id]}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isPlaying ? 'animate-pulse-slow' : ''}
                  style={{ width: '20px', height: '20px', color: '#5a3500' }}
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#5a3500" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  {isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
