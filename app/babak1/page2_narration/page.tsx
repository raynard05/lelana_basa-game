'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Skip from '@/components/Skip';
import Sinopsis from '@/components/Sinopsis';
import AnimatedNarrationText from '@/components/AnimatedNarrationText';
import './page2.css';

export default function Babak1Page2() {
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
    router.push('/babak1/page3');
  };

  if (isValidating) {
    return (
      <div className="babak2-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="babak2-container">
      {/* Top Controls */}
      <Home className="nav-btn home-btn" />
      <Music className="nav-btn music-btn" />
      <Skip onClick={handleSkip} className="nav-btn skip-btn" />

      {/* Main Content Card Scroll Layout */}
      <div className="card-frame-page2">
        <AnimatedNarrationText babak={1} currentTime={currentTime} duration={duration} />
      </div>

      {/* Bottom Narration Audio Player Container */}
      <div className="audio-container-page2">
        <Sinopsis music_assets="/audio/babak1/page1.mp3"  onTimeUpdate={setCurrentTime} onDurationChange={setDuration} autoPlay={true} />
      </div>
    </div>
  );
}
