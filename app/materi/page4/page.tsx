'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page4.css';

export default function MateriPage4() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page3');
  };

  const handleNext = () => {
    router.push('/materi/page5');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch swipe support
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <main
      className="p4-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="p4-home-btn" />
      <Music className="p4-music-btn" />

      {/* Main Board Stage */}
      <div className="p4-board-stage">
        {/* Top Pill Badge: 3. Basa Krama */}
        <div className="p4-top-badge-wrapper">
          <Image
            src="/revisi/revisipamong/3.webp"
            alt="3. Basa Krama"
            width={805}
            height={157}
            className="p4-pill-img"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          className="p4-arrow-btn p4-arrow-left"
          onClick={handlePrev}
          aria-label="Slide Sadurunge"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="p4-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="p4-arrow-btn p4-arrow-right"
          onClick={handleNext}
          aria-label="Slide Sabanjure"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="p4-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="p4-board-frame">
          <div className="p4-board-content">
            <div className="p4-slide">
              <p className="p4-intro-text">
                Digunakake kanggo nuduhake rasa hurmat lan pakurmatan marang mitra tutur, umume marang wong sing luwih tuwa, durung raket, utawa duwe kalungguhan luwih dhuwur.
              </p>
              <div className="p4-section-block">
                <p className="p4-section-heading">a. Krama Lugu</p>
                <p className="p4-paragraph">
                  Kabeh tembunge nganggo basa krama minangka unsur utama, tanpa krama inggil/krama madya kang dominan. Digunakake marang wong sing durung raket utawa drajate dianggep padha, supaya tetep santun tanpa pakurmatan kang banget.
                </p>
                <p className="p4-paragraph p4-example-text">
                  <strong>Tuladha:</strong> &quot;Sampeyan sampun nedha napa dereng?&quot; (kabeh tembunge migunakake basa krama)
                </p>
              </div>
              <div className="p4-section-block">
                <p className="p4-section-heading">b. Krama Alus</p>
                <p className="p4-paragraph">
                  Migunakake tembung krama inggil kanggo pakurmatan paling dhuwur. Digunakake marang wong tuwa, guru, utawa wong sing dihurmati.
                </p>
                <p className="p4-paragraph p4-example-text">
                  <strong>Tuladha:</strong> &quot;Panjenengan sampun dhahar menapa dereng?&quot; (kabeh tembunge migunakake krama inggil)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
