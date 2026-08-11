'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Skip from '@/components/Skip';
import Sinopsis from '@/components/Sinopsis';
import AnimatedNarrationText from '@/components/AnimatedNarrationText';
import './page1_narration.css';

export default function Babak3Page1Narration() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const router = useRouter();

  // 1. Session verification check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push('/');
        } else {
          setCurrentUser(user);
          setIsValidating(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  const handleSkip = () => {
    router.push('/babak4/page1');
  };

  if (isValidating) {
    return (
      <div className="babak3-page1-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="babak3-page1-container">
      {/* Top Controls */}
      <Home className="babak3-page1-nav-btn babak3-page1-home-btn" />
      <Music className="babak3-page1-nav-btn babak3-page1-music-btn" />
      <Skip onClick={handleSkip} className="babak3-page1-nav-btn babak3-page1-skip-btn" />

      {/* Main Content Card Scroll Layout */}
      <div className="babak3-page1-card-frame">
        <AnimatedNarrationText babak={3} currentTime={currentTime} duration={duration} />
      </div>

      {/* Bottom Narration Audio Player Container */}
      <div className="babak3-page1-audio-container">
        <Sinopsis music_assets="/audio/babak3/page1.mp3"  onTimeUpdate={setCurrentTime} onDurationChange={setDuration} autoPlay={true} />
      </div>
    </div>
  );
}
