'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  isLocked?: boolean;
  onTimeOut?: () => void;
  storageKey: string;
}

export default function Timer({
  initialTime = 60,
  isLocked = false,
  onTimeOut,
  storageKey
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const onTimeOutRef = useRef<(() => void) | undefined>(onTimeOut);

  // Keep onTimeOut ref updated to avoid stale closures
  useEffect(() => {
    onTimeOutRef.current = onTimeOut;
  }, [onTimeOut]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const expirationKey = `${storageKey}_expiration`;
    const pauseKey = `${storageKey}_paused_time`;

    const savedExpiration = localStorage.getItem(expirationKey);
    const savedPauseTime = localStorage.getItem(pauseKey);

    let expirationTime: number;
    let pauseTime = savedPauseTime ? parseInt(savedPauseTime, 10) : null;
    if (pauseTime && isNaN(pauseTime)) {
      pauseTime = null;
    }

    if (savedExpiration !== null) {
      const parsed = parseInt(savedExpiration, 10);
      let remaining = 0;
      if (!isNaN(parsed)) {
        const referenceTime = pauseTime !== null ? pauseTime : Date.now();
        remaining = Math.max(0, Math.ceil((parsed - referenceTime) / 1000));
      }

      if (isNaN(parsed) || remaining <= 0) {
        // Stale or expired timer from a previous session, start fresh
        expirationTime = Date.now() + initialTime * 1000;
        localStorage.setItem(expirationKey, expirationTime.toString());
        localStorage.removeItem(pauseKey);
        pauseTime = null;
      } else {
        expirationTime = parsed;
      }
    } else {
      expirationTime = Date.now() + initialTime * 1000;
      localStorage.setItem(expirationKey, expirationTime.toString());
      localStorage.removeItem(pauseKey);
      pauseTime = null;
    }

    if (isLocked) {
      if (pauseTime === null) {
        pauseTime = Date.now();
        localStorage.setItem(pauseKey, pauseTime.toString());
      }
      const remaining = Math.max(0, Math.ceil((expirationTime - pauseTime) / 1000));
      setTimeLeft(remaining);
      return;
    }

    // If we were paused and are now resuming
    if (pauseTime !== null) {
      const pauseDuration = Date.now() - pauseTime;
      expirationTime += pauseDuration;
      localStorage.setItem(expirationKey, expirationTime.toString());
      localStorage.removeItem(pauseKey);
    }

    const calculateRemaining = () => {
      return Math.max(0, Math.ceil((expirationTime - Date.now()) / 1000));
    };

    const initialRemaining = calculateRemaining();
    setTimeLeft(initialRemaining);

    if (initialRemaining === 0) {
      localStorage.removeItem(expirationKey);
      localStorage.removeItem(pauseKey);
      if (onTimeOutRef.current) {
        onTimeOutRef.current();
      }
      return;
    }

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        localStorage.removeItem(expirationKey);
        localStorage.removeItem(pauseKey);
        if (onTimeOutRef.current) {
          onTimeOutRef.current();
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [storageKey, isLocked, initialTime]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Don't render anything until client-side state is initialized
  if (timeLeft === null) {
    return (
      <div className="timer-badge">
        <Clock className="timer-icon" size={20} />
        <span>--:--</span>
      </div>
    );
  }

  return (
    <div className="timer-badge">
      <Clock className="timer-icon" size={20} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}

