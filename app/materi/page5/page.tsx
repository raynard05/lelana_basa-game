'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page5.css';

export default function MateriPage5() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page4');
  };

  const handleNext = () => {
    router.push('/materi/page6');
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
      className="p5-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="p5-home-btn" />
      <Music className="p5-music-btn" />

      {/* Main Board Stage */}
      <div className="p5-board-stage">
        {/* Left Arrow Button */}
        <button
          type="button"
          className="p5-arrow-btn p5-arrow-left"
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
            className="p5-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="p5-arrow-btn p5-arrow-right"
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
            className="p5-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="p5-board-frame">
          <div className="p5-board-content">
            <div className="p5-slide">
              <div className="p5-center-badge">
                <Image
                  src="/revisi/revisipamong/tagtabelringkesan.webp"
                  alt="Tabel Ringkesan"
                  width={584}
                  height={72}
                  className="p5-badge-table-tag"
                  priority
                  unoptimized
                />
              </div>
              <div className="p5-table-wrap">
                <Image
                  src="/revisi/revisipamong/tataran.webp"
                  alt="Tabel Ringkesan Tataran"
                  width={916}
                  height={235}
                  className="p5-table-tataran-img"
                  priority
                  unoptimized
                />
              </div>

              <div className="p5-center-badge p5-mt-table-badge">
                <Image
                  src="/revisi/revisipamong/tagtabelrelasisosialundhausuk.webp"
                  alt="Tabel Relasi Sosial Undha-Usuk Basa Jawa"
                  width={687}
                  height={72}
                  className="p5-badge-table-tag"
                  priority
                  unoptimized
                />
              </div>
              <div className="p5-table-wrap">
                <Image
                  src="/revisi/revisipamong/tagragambasa.webp"
                  alt="Tabel Relasi Sosial Ragam Basa"
                  width={916}
                  height={297}
                  className="p5-table-ragambasa-img"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
