'use client';

import { useState, useEffect, useRef } from 'react';

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
      <style dangerouslySetInnerHTML={{
        __html: `
        .unggah-ungguh-container {
          background-color: #ebdcb9;
          border: 3.5px solid #5a3500;
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 1100px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          font-family: 'Outfit', 'Inter', sans-serif;
          box-sizing: border-box;
        }

        .unggah-ungguh-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-auto-flow: column;
          gap: 20px;
        }

        .speech-level-card {
          background-color: #ecd7ae;
          border: 2.5px solid #5a3500;
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
          user-select: none;
          box-sizing: border-box;
          min-height: 100px;
        }

        .speech-level-card:hover {
          transform: translateY(-2px);
          background-color: #f3dfba;
          box-shadow: 0 6px 15px rgba(90, 53, 0, 0.15);
        }

        .speech-level-card.selected {
          border-color: #d49033;
          background-color: #f7ebd3;
          box-shadow: 0 0 15px rgba(212, 144, 51, 0.4);
        }

        .speech-level-card.disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
        
        .speech-level-card.disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .letter-badge {
          background: linear-gradient(180deg, #ffdb3b 0%, #f5cb35 100%);
          border: 2px solid #5a3500;
          border-radius: 8px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          color: #2b1500;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .card-text-section {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .speech-title {
          font-weight: 800;
          font-size: 17px;
          color: #2b1500;
          margin: 0;
        }

        .speech-quote {
          font-size: 14px;
          color: #4a3621;
          margin: 0;
          line-height: 1.4;
          font-style: italic;
        }

        .speaker-button {
          background: radial-gradient(circle, #f0cf97 0%, #d49f53 100%);
          border: 2px solid #5a3500;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.4), 0 3px 6px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease, filter 0.1s ease;
          padding: 0;
          outline: none;
        }

        .speaker-button:hover {
          filter: brightness(1.08);
          transform: scale(1.05);
        }

        .speaker-button:active {
          transform: scale(0.95);
        }

        .speaker-button.playing {
          background: radial-gradient(circle, #ffe3b3 0%, #e2aa62 100%);
          box-shadow: 0 0 10px rgba(212, 144, 51, 0.5);
        }

        .animate-pulse-slow {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        /* Mobile / Small Screens Layout */
        @media (max-width: 768px) and (orientation: portrait) {
          .unggah-ungguh-grid {
            grid-template-columns: 1fr;
            grid-template-rows: unset;
            grid-auto-flow: unset;
            gap: 12px;
          }

          .unggah-ungguh-container {
            padding: 16px;
          }

          .speech-level-card {
            padding: 12px 16px;
            min-height: auto;
          }

          .speech-title {
            font-size: 15px;
          }

          .speech-quote {
            font-size: 13px;
          }

          .speaker-button {
            width: 38px;
            height: 38px;
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .unggah-ungguh-container {
            transform: translateY(2vh);
            padding: 4.8vh 1vw;
            border-width: 2px;
            border-radius: 2.9vh;
          }
          .unggah-ungguh-grid {
            gap: 1.4vh;
          }
          .speech-level-card {
            padding: 1.4vh 1.1vw;
            border-width: 1.5px;
            border-radius: 2.4vh;
            min-height: auto;
            gap: 0.9vw;
          }
          .letter-badge {
            width: 5.3vh;
            height: 5.3vh;
            font-size: 2.6vh;
            border-width: 1.5px;
            border-radius: 1.4vh;
          }
          .speech-title {
            font-size: 2.9vh;
          }
          .speech-quote {
            font-size: 2.4vh;
            line-height: 1.15;
          }
          .speaker-button {
            width: 6.3vh;
            height: 6.3vh;
            border-width: 1.5px;
          }
          .speaker-button svg {
            width: 2.9vh !important;
            height: 2.9vh !important;
          }
        }
          

      `}} />

      <div className="unggah-ungguh-grid">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isPlaying = playingId === opt.id;

          return (
            <div
              key={opt.id}
              className={`speech-level-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
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
