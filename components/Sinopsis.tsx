'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';

interface SinopsisProps {
  music_assets: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  progressColor?: string;
  trackColor?: string;
  thumbColor?: string;
}

export default function Sinopsis({
  music_assets,
  backgroundColor = '#1c180d',
  borderColor = '#d4a574',
  textColor = '#f5e6c8',
  iconColor = '#d4a574',
  progressColor = '#f3d393',
  trackColor = '#59513e',
  thumbColor = '#f3d393',
}: SinopsisProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    // Sync duration immediately if already loaded
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [music_assets]);

  // If the component is unmounted while playing, resume background music
  useEffect(() => {
    return () => {
      if (isPlaying) {
        window.dispatchEvent(new Event('resumeBackgroundMusic'));
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    } else {
      window.dispatchEvent(new Event('pauseBackgroundMusic'));
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback failed:', err);
      });
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="sinopsis-player-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        .sinopsis-player-container {
          display: flex;
          align-items: center;
          background: ${backgroundColor};
          border: 1.5px solid ${borderColor};
          border-radius: 12px;
          padding: 10px 24px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Outfit', 'Inter', sans-serif;
          user-select: none;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }

        .sinopsis-play-control {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          color: ${textColor};
          transition: opacity 0.2s ease;
        }

        .sinopsis-play-control:hover {
          opacity: 0.85;
        }

        .sinopsis-icon {
          color: ${iconColor};
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .sinopsis-text {
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
          color: ${textColor};
        }

        .sinopsis-scrubber-container {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 24px;
        }

        .sinopsis-slider {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(to right, ${progressColor} ${progressPct}%, ${trackColor} ${progressPct}%);
          transition: background 0.1s ease;
        }

        .sinopsis-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${thumbColor};
          cursor: pointer;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
          transition: transform 0.1s ease;
        }

        .sinopsis-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .sinopsis-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${thumbColor};
          cursor: pointer;
          border: none;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
          transition: transform 0.1s ease;
        }

        .sinopsis-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        .sinopsis-timer {
          color: ${textColor};
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
      `}} />

      <audio ref={audioRef} src={music_assets} />

      <div className="sinopsis-play-control" onClick={togglePlay}>
        <div className="sinopsis-icon">
          <Volume2 size={24} style={{ opacity: isPlaying ? 1 : 0.6 }} className={isPlaying ? "animate-pulse" : ""} />
        </div>
        <span className="sinopsis-text">Rungokna Narasi</span>
      </div>

      <div className="sinopsis-scrubber-container">
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleScrub}
          className="sinopsis-slider"
        />
      </div>

      <div className="sinopsis-timer">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
