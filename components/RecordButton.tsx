'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './RecordButton.css';

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
      style={style}
      aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
    >
      {isRecording && <span className="recording-dot" />}

      <Image
        src="/main/rekam_button.png"
        alt="Rekam"
        width={260}
        height={70}
        className="record-btn-img"
        priority
        unoptimized
      />
    </button>
  );
}
