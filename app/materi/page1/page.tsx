'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './page1.css';

export default function MateriPage1() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/materi/page6');
  };

  const handleNext = () => {
    router.push('/materi/page2');
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
      className="pamong-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <Home className="pamong-home-btn" />
      <Music className="pamong-music-btn" />

      {/* Main Board Stage */}
      <div className="pamong-board-stage">
        {/* Top Badge: CP lan TP */}
        <div className="pamong-top-badge-wrapper">
          <Image
            src="/revisi/revisipamong/tagcplantp.webp"
            alt="CP lan TP"
            width={485}
            height={265}
            className="pamong-tagcplantp-img"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          className="pamong-arrow-btn pamong-arrow-left"
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
            className="pamong-arrow-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="pamong-arrow-btn pamong-arrow-right"
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
            className="pamong-arrow-icon"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Board Frame & Inner Content */}
        <div className="pamong-board-frame">
          <div className="pamong-board-content">
            <div className="pamong-slide">
              <div className="pamong-center-badge">
                <Image
                  src="/revisi/revisipamong/cp.webp"
                  alt="Capaian Pasinaon (CP)"
                  width={597}
                  height={75}
                  className="pamong-inner-badge-img"
                  priority
                  unoptimized
                />
              </div>
              <div className="pamong-text-block">
                <p className="pamong-title-bold">
                  Fase D, Elemen: Berbicara dan Mempresentasikan
                </p>
                <p className="pamong-paragraph pamong-text-justify">
                  Peserta didik mampu menyampaikan gagasan, pikiran, pandangan, arahan atau pesan untuk tujuan pengajuan usul, pemecahan masalah, dan pemberian solusi secara lisan dalam bentuk monolog dan dialog logis, kritis, dan kreatif sesuai dengan tata krama. Peserta didik mampu menggunakan dan memaknai kosakata baru yang menggunakan basa rinengga/lalong&egrave;t untuk berbicara dan menyajikan gagasan sesuai unggah-ungguh basa. Peserta didik mampu berdiskusi secara aktif, kontributif, efektif, dan santun.
                </p>
              </div>

              <div className="pamong-center-badge pamong-mt-badge">
                <Image
                  src="/revisi/revisipamong/tp.webp"
                  alt="Tujuwan Pasinaon (TP)"
                  width={597}
                  height={75}
                  className="pamong-inner-badge-img"
                  priority
                  unoptimized
                />
              </div>
              <div className="pamong-text-block">
                <p className="pamong-paragraph pamong-list-item">
                  1. Mangerteni teges lan jinis-jinise undha-usuk basa Jawa (ngoko lugu, ngoko alus, krama lugu, krama alus).
                </p>
                <p className="pamong-paragraph pamong-list-item">
                  2. Nemtokake ragam basa Jawa kang trep adhedhasar umur, kalungguhan, lan drajat mitra tutur.
                </p>
                <p className="pamong-paragraph pamong-list-item">
                  3. Praktek micara migunakake undha-usuk basa Jawa kanthi bener lan santun miturut konteks komunikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

