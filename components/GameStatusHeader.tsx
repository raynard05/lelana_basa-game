'use client';

import { useState, useEffect, useRef } from 'react';

interface GameStatusHeaderProps {
  babak: number | string;
  misi: number | string;
  score: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function GameStatusHeader({
  babak,
  misi,
  score,
  className = '',
  style,
}: GameStatusHeaderProps) {
  const [pulse, setPulse] = useState(false);
  const prevScoreRef = useRef(score);

  // Trigger pulse animation whenever the score changes
  useEffect(() => {
    if (score !== prevScoreRef.current) {
      setPulse(true);
      prevScoreRef.current = score;
      const timer = setTimeout(() => setPulse(false), 500);
      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <div className={`game-status-header-container ${className}`} style={style}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .game-status-header-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          user-select: none;
          font-family: 'Outfit', 'Inter', sans-serif;
          align-items: flex-end;
          width: 200px;
        }

        .status-badge {
          /* Gradient brown matching classic RPG wood frame */
          background: linear-gradient(135deg, #4e3429 0%, #362219 100%);
          border: 2.5px solid #d4a574;
          border-radius: 50px; /* Capsule shape */
          padding: 8px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff8e1;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.25);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          width: 100%;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* Subtle inner golden glow ring */
        .status-badge::before {
          content: '';
          position: absolute;
          inset: 1.5px;
          border: 1px solid rgba(212, 165, 116, 0.3);
          border-radius: 50px;
          pointer-events: none;
        }

        /* Light glare highlight effect across the top half */
        .status-badge::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .score-badge-el.pulse-active {
          transform: scale(1.08);
          border-color: #ffd700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.6), 0 6px 12px rgba(0, 0, 0, 0.45);
        }

        .star-container {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floatStar 3s ease-in-out infinite;
        }

        .star-svg-glow {
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.8));
        }

        @keyframes floatStar {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.05);
          }
        }

        @media (max-height: 720px) and (orientation: landscape) {
          .game-status-header-container {
            flex-direction: column !important;
            align-items: flex-end !important;
            gap: 6px;
            width: 150px !important;
          }
          .status-badge {
            padding: 4px 14px;
            font-size: 13px;
            width: 100% !important;
            min-width: unset !important;
            border-width: 1.5px;
          }
          .star-svg-glow {
            width: 14px !important;
            height: 14px !important;
          }
        }
      `}} />

      {/* 1. Babak & Misi Badge */}
      <div className="status-badge babak-badge-el">
        <span>Babak {babak} - Misi {misi}</span>
      </div>

      {/* 2. Skor Badge */}
      <div className={`status-badge score-badge-el ${pulse ? 'pulse-active' : ''}`}>
        <span>Skor</span>
        <div className="star-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffd700"
            stroke="#b38600"
            strokeWidth="1.5"
            className="star-svg-glow"
            style={{ width: '20px', height: '20px' }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <span>{score}</span>
      </div>
    </div>
  );
}
