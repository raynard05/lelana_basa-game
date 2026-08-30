'use client';



import { usePathname } from 'next/navigation';
import { RotateCw } from 'lucide-react';

export default function OrientationGuard() {
  const pathname = usePathname();

  // Exclude specific pages from being blocked
  if ( pathname === '') {
    return null;
  }

  return (
    <>
      <div className="orientation-warning-overlay">
        <div className="orientation-warning-card">
          <div className="rotation-icon-wrapper">
            <RotateCw className="rotation-device-icon" size={54} />
          </div>
          <h2 className="orientation-warning-title">Mangga miringake layar</h2>
          <p className="orientation-warning-desc">
            Sinaune bakal luwih penak yen mode landscape (horizontal)
            Miringake Hp-ne supaya bisa dolanan.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .orientation-warning-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(18, 11, 0, 1);
          z-index: 99999;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        /* Show the overlay ONLY in portrait mode */
        @media (orientation: portrait) {
          .orientation-warning-overlay {
            display: flex;
          }
        }

        .orientation-warning-card {
          background: rgba(255, 252, 252, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2px solid rgba(212, 165, 116, 0.3);
          border-radius: 28px;
          padding: 36px 20px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .rotation-icon-wrapper {
          width: 90px;
          height: 90px;
          background: rgba(212, 165, 116, 0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(212, 165, 116, 0.25);
        }

        .rotation-device-icon {
          color: #D4A574;
          animation: rotatePhone 2.2s infinite ease-in-out;
        }

        .orientation-warning-title {
          color: #FFF8E1;
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 12px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        .orientation-warning-desc {
          color: #D4A574;
          font-size: 13.5px;
          line-height: 1.6;
          font-weight: 500;
        }

        @keyframes rotatePhone {
          0%, 100% {
            transform: rotate(0deg);
          }
          40%, 60% {
            transform: rotate(-90deg);
          }
        }
      ` }} />
    </>
  );
}
