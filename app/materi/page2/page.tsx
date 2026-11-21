'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page2.css';

export default function MateriPage2() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page1');
  };

  const handleNext = () => {
    router.push('/materi/page3');
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
      className="p2-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="p2-home-btn" />
      <Music className="p2-music-btn" />

      {/* Main Board Stage */}
      <div className="p2-board-stage">
        {/* Top Tag: Materi */}
        <div className="p2-top-badge-wrapper p2-badge-materi-pos">
          <Image
            src="/revisi/revisipamong/tagmateri.webp"
            alt="Materi"
            width={516}
            height={155}
            className="p2-tagmateri-img"
            priority
            unoptimized
          />
        </div>

        {/* Top Pill Badge: 1. Apa Iku Undha-Usuk Basa Jawa? */}
        <div className="p2-top-badge-wrapper p2-badge-pill-pos">
          <Image
            src="/revisi/revisipamong/1.webp"
            alt="1. Apa Iku Undha-Usuk Basa Jawa?"
            width={805}
            height={157}
            className="p2-pill-img"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          className="p2-arrow-btn p2-arrow-left"
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
            className="p2-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="p2-arrow-btn p2-arrow-right"
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
            className="p2-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="p2-board-frame">
          <div className="p2-board-content">
            <div className="p2-slide">
              <p className="p2-slide2-text">
                Undha-usuk basa Jawa yaiku sistem tingkat tutur (tataran basa) sing ngatur panganggone ragam basa Jawa adhedhasar sesambungan sosial antarane panutur (sing ngomong) lan mitra tutur (sing diajak omong). Sistem iki dadi wujud tata krama lan kesantunan sajrone komunikasi basa Jawa, ora mung babagan apa sing diomongake, nanging uga sapa sing diajak ngomong, kepriye kahanane, lan kepriye sesambungane. Kanggo nggampangake pasinaon, undha-usuk basa Jawa diperang dadi rong golongan gedhe, yaiku ngoko lan krama, kang saben-sabene isih diperang maneh dadi rong jinis.
              </p>
              <div className="p2-diagram-wrap">
                <Image
                  src="/revisi/revisipamong/turunanundhausuk.webp"
                  alt="Undha-usuk Basa Jawa"
                  width={674}
                  height={317}
                  className="p2-diagram-img"
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
