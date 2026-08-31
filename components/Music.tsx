'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './Music.css';

interface MusicProps {
  className?: string;
  style?: React.CSSProperties;
}

// Module-level global background music player (persists across Next.js page transitions)
function getGlobalAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  
  // Attach to window to survive Next.js HMR (Hot Module Replacement)
  if (!(window as any).__lelanaGlobalAudio) {
    const audio = new Audio('/audio/backsound_game.mp3');
    audio.loop = true;
    audio.volume = 0.25;
    (window as any).__lelanaGlobalAudio = audio;
  }
  return (window as any).__lelanaGlobalAudio;
}

export default function Music({ className, style }: MusicProps) {
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Load sound setting and sync music playback state on mount
  useEffect(() => {
    const savedSound = localStorage.getItem('isSoundOn');
    const soundEnabled = savedSound !== 'false'; // Default to true if not set
    setIsSoundOn(soundEnabled);

    if (savedSound === null) {
      localStorage.setItem('isSoundOn', 'true');
    }

    // Play or pause background music based on loaded state
    const audio = getGlobalAudio();
    if (audio) {
      if (soundEnabled) {
        audio.play().catch(() => {
          // Catch and ignore browser autoplay blocks
        });
      } else {
        audio.pause();
      }
    }

    // Sync button icon and audio state when toggled from other pages/components
    const handleToggleEvent = () => {
      const currentVal = localStorage.getItem('isSoundOn');
      const enabled = currentVal !== 'false';
      setIsSoundOn(enabled);

      const audio = getGlobalAudio();
      if (audio) {
        if (enabled) {
          audio.volume = 0.25;
          audio.play().catch(() => { });
        } else {
          audio.pause();
        }
      }
    };

    // "Duck" the background music instead of pausing it completely
    const handlePauseBgMusic = () => {
      const audio = getGlobalAudio();
      if (audio) {
        audio.volume = 0.1; // Lower volume drastically so voiceover is clear
      }
    };

    const handleResumeBgMusic = () => {
      const savedSound = localStorage.getItem('isSoundOn');
      const enabled = savedSound !== 'false';
      if (enabled) {
        const audio = getGlobalAudio();
        if (audio) {
          audio.volume = 0.25; // Ensure background music stays at 0.25
          if (audio.paused) {
            audio.play().catch(() => { });
          }
        }
      }
    };

    window.addEventListener('soundToggle', handleToggleEvent);
    window.addEventListener('pauseBackgroundMusic', handlePauseBgMusic);
    window.addEventListener('resumeBackgroundMusic', handleResumeBgMusic);

    return () => {
      window.removeEventListener('soundToggle', handleToggleEvent);
      window.removeEventListener('pauseBackgroundMusic', handlePauseBgMusic);
      window.removeEventListener('resumeBackgroundMusic', handleResumeBgMusic);
    };
  }, []);

  const toggleSound = () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    localStorage.setItem('isSoundOn', String(newSoundState));

    // Play or pause the global audio element
    const audio = getGlobalAudio();
    if (audio) {
      if (newSoundState) {
        audio.volume = 1.0;
        audio.play().catch((err) => {
          console.warn('Playback failed:', err);
        });
      } else {
        audio.pause();
      }
    }

    // Dispatch event to sync state across other components and audio-players
    window.dispatchEvent(new Event('soundToggle'));
  };

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`music-btn-wrapper ${className}`}
      style={style}
      aria-label="Toggle Sound"
    >
      <Image
        src={isSoundOn ? '/main/sound_on.png' : '/main/sound_off.png'}
        alt="Sound Toggle"
        fill
        sizes="80px"
        className="icon-img"
        priority
        unoptimized
      />
    </button>
  );
}