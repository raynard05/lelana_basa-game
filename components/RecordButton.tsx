'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface RecordButtonProps {
  onTranscript?: (transcript: string) => void;
  lang?: string; // Default is Javanese ('jv-ID')
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function RecordButton({
  onTranscript,
  lang = 'jv-ID', // default to Javanese
  className = '',
  style,
  disabled = false,
}: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const onTranscriptRef = useRef(onTranscript);
  const langRef = useRef(lang);

  // Keep references up to date to avoid re-running the initialization hook
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    langRef.current = lang;
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }, [lang]);

  // Initialize browser SpeechRecognition once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = langRef.current;

        rec.onstart = () => {
          setIsRecording(true);
          window.dispatchEvent(new Event('pauseBackgroundMusic'));
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          if (onTranscriptRef.current) {
            onTranscriptRef.current(resultText);
          }
        };

        rec.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
          window.dispatchEvent(new Event('resumeBackgroundMusic'));
        };

        recognitionRef.current = rec;
      } else {
        console.warn('Browser does not support SpeechRecognition Web API.');
      }
    }

    // Cleanup to prevent memory leaks and active dangling speech recognition sessions
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const startRecording = () => {
    if (disabled) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = lang;
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setIsRecording(false);
      }
    } else {
      alert('Browser Anda tidak mendukung Speech Recognition.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // already stopped
      }
    }
    setIsRecording(false);
  };

  const handleToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`record-btn-wrapper ${isRecording ? 'recording' : ''} ${disabled ? 'disabled' : ''} ${className}`}
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
      aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .record-btn-wrapper {
          transition: transform 0.2s ease;
        }

        .record-btn-wrapper:hover:not(.disabled) {
          transform: scale(1.08);
        }

        .record-btn-wrapper:active:not(.disabled) {
          transform: scale(0.95);
        }

        .record-btn-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: filter 0.2s ease;
        }

        .record-btn-wrapper.recording .record-btn-img {
          filter: brightness(1.1) drop-shadow(0 0 10px rgba(239, 68, 68, 0.6));
        }

        /* Pulse ring around the button while recording */
        .record-btn-wrapper.recording::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 3px solid #ef4444;
          animation: recordPulse 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          pointer-events: none;
        }

        /* Red blinking dot indicator */
        .recording-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 14px;
          height: 14px;
          background-color: #ef4444;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
          animation: blink 1s infinite;
          z-index: 10;
        }

        @keyframes recordPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}} />

      {isRecording && <span className="recording-dot" />}

      <Image
        src="/main/rekam_button.png"
        alt="Rekam"
        width={80}
        height={80}
        className="record-btn-img"
        priority
        unoptimized
      />
    </button>
  );
}
