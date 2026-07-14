'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Skip from '@/components/Skip';
import Sinopsis from '@/components/Sinopsis';
import './page2.css';

export default function babak7Page2Narration() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
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
    router.push('/babak7/page3');
  };

  if (isValidating) {
    return (
      <div className="babak7-page2-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="babak7-page2-container">
      {/* Top Controls */}
      <Home className="babak7-page2-nav-btn babak7-page2-home-btn" />
      <Music className="babak7-page2-nav-btn babak7-page2-music-btn" />
      <Skip onClick={handleSkip} className="babak7-page2-nav-btn babak7-page2-skip-btn" />

      {/* Main Content Card Scroll Layout */}
      <div className="babak7-page2-card-frame">
        <div className="babak7-page2-text-container"></div>
      </div>

      {/* Bottom Narration Audio Player Container */}
      <div className="babak7-page2-audio-container">
        <Sinopsis music_assets="/audio/babak7/page2.mp3" />
      </div>
    </div>
  );
}
