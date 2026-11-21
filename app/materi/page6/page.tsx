'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page6.css';

export default function MateriPage6() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page5');
  };

  const handleNext = () => {
    router.push('/materi/page1');
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
      className="p6-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="p6-home-btn" />
      <Music className="p6-music-btn" />

      {/* Main Board Stage */}
      <div className="p6-board-stage">
        {/* Top Pill Badge: 4. Cara Nemtokake Ragam Basa */}
        <div className="p6-top-badge-wrapper">
          <Image
            src="/revisi/revisipamong/4.webp"
            alt="4. Cara Nemtokake Ragam Basa"
            width={805}
            height={157}
            className="p6-pill-img"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          className="p6-arrow-btn p6-arrow-left"
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
            className="p6-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="p6-arrow-btn p6-arrow-right"
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
            className="p6-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="p6-board-frame">
          <div className="p6-board-content">
            <div className="p6-slide">
              <div className="p6-slide6-text">
                <p className="p6-paragraph p6-s6-intro">
                  Sadurunge micara, siswa bisa takon marang awake dhewe:
                </p>
                <p className="p6-paragraph p6-s6-item">
                  1. Sapa mitra tuture? (luwih tuwa/sapantaran/luwih enom)
                </p>
                <p className="p6-paragraph p6-s6-item">
                  2. Kepriye sesambungane? (raket/durung raket/formal)
                </p>
                <p className="p6-paragraph p6-s6-item">
                  3. Ing kahanan apa? (santai/resmi)
                </p>
                <p className="p6-paragraph p6-s6-intro p6-mt-xs">
                  Uga bisa migunakake rumus basa ing ngisor iki:
                </p>
                <p className="p6-paragraph p6-s6-bold">
                  Rumus umum: Jejer + Wasesa + Lesan + Katrangan
                </p>
                <p className="p6-paragraph p6-s6-bold">
                  Katrangan:
                </p>
                <div className="p6-s6-grid">
                  <div className="p6-s6-col">
                    <span>Jejer: Subjek (kata ganti orang)</span>
                    <span>Wasesa: Predikat (kata kerja)</span>
                  </div>
                  <div className="p6-s6-col">
                    <span>Lesan: objek (yang dikenai pekerjaan)</span>
                    <span>Katrangan: Keterangan tempat, waktu, latar, dll</span>
                  </div>
                </div>
              </div>
              <div className="p6-table-rumus-wrap">
                <Image
                  src="/revisi/revisipamong/rumusundhausukbasajawa.webp"
                  alt="Rumus Undha Usuk Basa Jawa"
                  width={1114}
                  height={199}
                  className="p6-table-rumus-img"
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
