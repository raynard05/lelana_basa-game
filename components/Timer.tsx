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
    let expirationTime: number;

    const savedExpiration = localStorage.getItem(expirationKey);
    if (savedExpiration !== null) {
      expirationTime = parseInt(savedExpiration, 10);
    } else {
      expirationTime = Date.now() + initialTime * 1000;
      localStorage.setItem(expirationKey, expirationTime.toString());
    }

    const calculateRemaining = () => {
      return Math.max(0, Math.ceil((expirationTime - Date.now()) / 1000));
    };

    // Set initial remaining time
    const initialRemaining = calculateRemaining();
    setTimeLeft(initialRemaining);

    if (initialRemaining === 0) {
      localStorage.removeItem(expirationKey);
      if (onTimeOutRef.current) {
        onTimeOutRef.current();
      }
      return;
    }

    if (isLocked) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        localStorage.removeItem(expirationKey);
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

