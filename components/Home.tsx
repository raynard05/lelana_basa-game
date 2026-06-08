'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HomeProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Home({ className, style }: HomeProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleHomeClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babak1_page1_timer_expiration');
      localStorage.removeItem('babak1_page1_timer_paused_time');
    }
    router.push('/menu');
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={handleHomeClick}
        type="button"
        className={className}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          outline: 'none',
          ...(!className && !style?.position ? { position: 'relative' } : {}),
          ...style
        }}
        aria-label="Go to Menu"
      >
        <Image
          src="/main/Home.png"
          alt="Home"
          fill
          sizes="80px"
          className="icon-img"
          priority
          unoptimized
        />
      </button>

      {showConfirm && (
        <div className="home-confirm-overlay" onClick={handleConfirmNo}>
          <style dangerouslySetInnerHTML={{
            __html: `
            .home-confirm-overlay {
              position: fixed;
              inset: 0;
              background: rgba(18, 11, 0, 0.85);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 99999;
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              animation: homeFadeIn 0.25s ease-out;
            }

            .home-confirm-card {
              background: rgba(255, 252, 252, 0.05);
              border: 2.5px solid rgba(212, 165, 116, 0.3);
              border-radius: 24px;
              padding: 4vh 4vw;
              max-width: 90vw;
              width: 500px;
              text-align: center;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              animation: homeScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .home-confirm-title {
              color: #FFF8E1;
              font-family: 'Outfit', 'Inter', sans-serif;
              font-size: 2.6vh;
              font-weight: 700;
              line-height: 1.6;
              margin-bottom: 4vh;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }

            .home-confirm-buttons {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4vw;
            }

            .home-confirm-btn {
              background: linear-gradient(180deg, #F0B863 0%, #D49033 100%);
              border: 2.5px solid #5A3500;
              border-radius: 12px;
              color: #261100;
              font-family: 'Outfit', 'Inter', sans-serif;
              font-size: 2.2vh;
              font-weight: 800;
              padding: 1vh 3vw;
              cursor: pointer;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
              transition: transform 0.15s ease, filter 0.2s ease;
              min-width: 120px;
            }

            .home-confirm-btn:hover {
              filter: brightness(1.1);
            }

            .home-confirm-btn:active {
              transform: scale(0.95);
            }

            .home-confirm-btn-cancel {
              background: linear-gradient(180deg, #9e9e9e 0%, #757575 100%);
              border-color: #3e3e3e;
              color: #ffffff;
            }

            @keyframes homeFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes homeScaleIn {
              from {
                opacity: 0;
                transform: scale(0.85) translateY(10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            @media (max-width: 960px) {
             .home-confirm-title {
              font-size : 0.9rem ; 

             }
              .home-confirm-btn {
                font-size: 0.7rem;
                padding: 10px 10px;
                min-width: 130px;
              }
              .home-confirm-buttons {
                gap: 16px;
              }
            }
          `}} />
          <div className="home-confirm-card" onClick={(e) => e.stopPropagation()}>
            <div className="home-confirm-title">
              Apa sampeyan yakin arep metu saka dolanan iki?
            </div>
            <div className="home-confirm-buttons">
              <button className="home-confirm-btn" onClick={handleConfirmYes}>
                Inggih
              </button>
              <button className="home-confirm-btn home-confirm-btn-cancel" onClick={handleConfirmNo}>
                Mboten
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
