'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Skip from '@/components/Skip';
import Sinopsis from '@/components/Sinopsis';
import './main_page.css';

export default function MainPage() {
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
    router.push('/babak1/page1');
  };

  if (isValidating) {
    return (
      <div className="mainpage-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mainpage-container">
      {/* Top Controls */}
      <Home className="mainpage-nav-btn mainpage-home-btn" />
      <Music className="mainpage-nav-btn mainpage-music-btn" />
      <Skip onClick={handleSkip} className="mainpage-nav-btn mainpage-skip-btn" />

      {/* Main Content Card Scroll Layout */}
      <div className="mainpage-card-frame">
        <div className="mainpage-text-container">

        </div>
      </div>

      {/* Bottom Narration Audio Player Container */}
      <div className="mainpage-audio-container">
        <Sinopsis
          music_assets="/audio/MP3 BABAK 1/1. narasi babak 1 .mp3"
          backgroundColor="#4E3F27"
          borderColor="#8E7B58"
          textColor="#EAD3A8"
          iconColor="#EAD3A8"
          progressColor="#EAD3A8"
          trackColor="#7A6C4D"
          thumbColor="#EAD3A8"
        />
      </div>
    </div>
  );
}
