'use client';

import { useEffect, useState } from 'react';
import './AnimatedNarration.css';

interface AnimatedNarrationTextProps {
  babak: number;
  currentTime: number;
  duration: number;
}

export default function AnimatedNarrationText({
  babak,
  currentTime,
  duration,
}: AnimatedNarrationTextProps) {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNarration = async () => {
      try {
        const response = await fetch('/narasi.txt');
        if (!response.ok) throw new Error('Failed to load narration text');
        
        const data = await response.text();
        const lines = data.split('\n');
        
        // Find line matching "narasi{babak}:" or "narasi{babak} :"
        const prefixRegex = new RegExp(`^narasi${babak}\\s*:`, 'i');
        const match = lines.find((line) => prefixRegex.test(line.trim()));
        
        if (match) {
          const content = match.replace(prefixRegex, '').trim();
          setText(content);
        } else {
          setText(`[Teks narasi untuk Babak ${babak} tidak ditemukan]`);
        }
      } catch (err) {
        console.error(err);
        setText(`[Gagal memuat teks narasi]`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNarration();
  }, [babak]);

  if (isLoading) {
    return <div className="animated-narration-wrapper">Loading...</div>;
  }

  const words = text.split(/\s+/);
  
  // To avoid dividing by zero or issues when duration isn't fully loaded
  const activeDuration = duration > 0 ? duration : 9999;
  
  return (
    <div className="animated-narration-wrapper">
      <p className="animated-narration-paragraph">
        {words.map((word, idx) => {
          // Calculate when this word should appear based on its index
          // We distribute the words evenly across the duration of the audio
          // Usually, audio has a little silence at the end, so we can reveal slightly faster than total duration
          // e.g., total duration * 0.95
          const revealTime = (idx / words.length) * (activeDuration * 0.95);
          const isRevealed = currentTime >= revealTime;
          
          return (
            <span key={idx}>
              <span className={`narration-word ${isRevealed ? 'revealed' : ''}`}>
                {word}
              </span>
              {' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}
