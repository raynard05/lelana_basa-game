'use client';

import { useEffect } from 'react';

export default function GlobalSoundEffects() {
  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the closest button element (covers nested SVG, spans, icons, etc.)
      const button = target.closest('button');
      if (button) {
        const audio = new Audio('/main/MP3_soundeffect/button_click.mp3');
        audio.play().catch((err) => {
          // Normal browser auto-play policy restriction block
          console.log('Button click sound playback failed:', err);
        });
      }
    };

    document.addEventListener('click', handleButtonClick);
    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, []);

  return null;
}
