'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ListenButtonProps {
  audioUrl: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function ListenButton({
  audioUrl,
  className = '',
  style,
  disabled = false,
  onPlayStateChange,
}: ListenButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set up audio instance and events when audioUrl changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
      if (onPlayStateChange) onPlayStateChange(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audioUrl, onPlayStateChange]);

  // If another sound starts playing, pause this audio automatically
  useEffect(() => {
    const handleGlobalPause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      }
    };

    window.addEventListener('pauseBackgroundMusic', handleGlobalPause);
    return () => {
      window.removeEventListener('pauseBackgroundMusic', handleGlobalPause);
    };
  }, [onPlayStateChange]);

  // Clean up and ensure background music resumes if unmounted while playing
  useEffect(() => {
    return () => {
      if (audioRef.current && !audioRef.current.paused) {
        window.dispatchEvent(new Event('resumeBackgroundMusic'));
      }
    };
  }, []);

  const handleToggle = () => {
    if (disabled || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
      if (onPlayStateChange) onPlayStateChange(false);
    } else {
      // 1. Dispatch global event to pause other playing audios (like background music or other clips)
      window.dispatchEvent(new Event('pauseBackgroundMusic'));

      // 2. Play this audio after a tiny delay to allow other events to clean up
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              if (onPlayStateChange) onPlayStateChange(true);
            })
            .catch((err) => {
              console.warn('Audio playback failed:', err);
              setIsPlaying(false);
              window.dispatchEvent(new Event('resumeBackgroundMusic'));
            });
        }
      }, 50);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`listen-btn-wrapper ${isPlaying ? 'playing' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        ...style,
      }}
      aria-label={isPlaying ? 'Pause audio' : 'Listen to audio'}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .listen-btn-wrapper {
          transition: transform 0.2s ease;
        }

        .listen-btn-wrapper:hover:not(.disabled) {
          transform: scale(1.08);
        }

        .listen-btn-wrapper:active:not(.disabled) {
          transform: scale(0.95);
        }

        .listen-btn-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: filter 0.2s ease;
        }

        /* Pulsing golden glow when playing */
        .listen-btn-wrapper.playing .listen-btn-img {
          filter: brightness(1.1) drop-shadow(0 0 10px rgba(212, 165, 116, 0.8));
          animation: playingPulse 2s ease-in-out infinite;
        }

        .listen-btn-wrapper.disabled {
          opacity: 0.6;
        }

        @keyframes playingPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
      `}} />

      <Image
        src="/main/rungokna_button.png"
        alt="Rungokna"
        width={80}
        height={80}
        className="listen-btn-img"
        priority
        unoptimized
      />
    </button>
  );
}
