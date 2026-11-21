'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page3.css';

export default function MateriPage3() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page2');
  };

  const handleNext = () => {
    router.push('/materi/page4');
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
      className="p3-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="p3-home-btn" />
      <Music className="p3-music-btn" />

      {/* Main Board Stage */}
      <div className="p3-board-stage">
        {/* Top Pill Badge: 2. Basa Ngoko */}
        <div className="p3-top-badge-wrapper">
          <Image
            src="/revisi/revisipamong/2.webp"
            alt="2. Basa Ngoko"
            width={805}
            height={157}
            className="p3-pill-img"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          className="p3-arrow-btn p3-arrow-left"
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
            className="p3-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="p3-arrow-btn p3-arrow-right"
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
            className="p3-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="p3-board-frame">
          <div className="p3-board-content">
            <div className="p3-slide">
              <p className="p3-intro-text">
                Digunakake nalika komunikasi karo wong sing wis rumaket, sapantaran umure, utawa kalungguhan sosiale padha. Ora ngemot rasa pakurmatan tartamtu, nanging kudu tetep dislarasake konteks komunikasi supaya ora dianggep kurang ngajeni.
              </p>
              <div className="p3-section-block">
                <p className="p3-section-heading">a. Ngoko Lugu</p>
                <p className="p3-paragraph">
                  Kabeh tembung, ater-ater, lan panambange nganggo basa ngoko, tanpa kecampuran tembung krama. Digunakake marang kanca, sadulur, utawa wong sing luwih enom.
                </p>
                <p className="p3-paragraph p3-example-text">
                  <strong>Tuladhane:</strong> &quot;Kowe wis mangan apa durung?&quot; (kabeh tembung migunakake basa ngoko)
                </p>
              </div>
              <div className="p3-section-block">
                <p className="p3-section-heading">b. Ngoko Alus</p>
                <p className="p3-paragraph">
                  Isih migunakake struktur ngoko, nanging wis kecampuran tembung krama inggil/krama madya kanggo nuduhake rasa hurmat. Digunakake nalika duwe sesambungan raket nanging kepengin tetep santun. Digunakake anak marang wong tuwa sing raket, murid marang guru sing wis kenal apik.
                </p>
                <p className="p3-paragraph p3-example-text">
                  <strong>Tuladhane:</strong> &quot;Bapak wis dhahar apa durung?&quot; (tembung &quot;dhahar&quot; klebu krama inggil, dene tembung sing liyane klebu ngoko)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
