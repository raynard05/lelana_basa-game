'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser } from '@/app/actions/auth';
import Music from '@/components/Music';
import './menu.css';

export default function MenuPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const router = useRouter();

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
        console.error('Auth verification error:', err);
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  const handleMenuClick = (menu: string) => {
    console.log('Navigating to:', menu);
    switch(menu) {
      case 'materi':
        router.push('/materi');
        break;
      case 'sinopsis':
        router.push('/sinopsis');
        break;
      case 'wiwiti':
        router.push('/babak1/page1');
        break;
      case 'profil':
        router.push('/profil');
        break;
    }
  };

  const handleInfo = () => {
    console.log('Info clicked');
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await logoutUser();
      localStorage.removeItem('user_session');
    } catch (err) {
      console.error('Logout error:', err);
    }
    router.push('/');
  };

  if (isValidating) {
    return (
      <div className="menu-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      {/* Main Content Center - Rendered first so absolute buttons sit on top in DOM order */}
      <div className="menu-content">
        <div className="menu-logo-container">
          <Image src="/main/lelana_basa.png" alt="Lelana Basa Logo" width={500} height={300} className="menu-logo-img" priority />
        </div>
        
        <div className="subtitle-container">
          <Image src="/menu_assets/teks_menu.png" alt="Sinau Undha Usuk Basa Jawa" width={400} height={80} className="subtitle-img" priority />
        </div>

        <div className="options-container">
          <Image src="/menu_assets/opsi_menu.png" alt="Menu Options" width={300} height={200} className="options-img" priority />
          <div className="options-overlay">
            <button onClick={() => handleMenuClick('materi')} className="overlay-btn" aria-label="Materi"></button>
            <button onClick={() => handleMenuClick('sinopsis')} className="overlay-btn" aria-label="Sinopsis Carita"></button>
            <button onClick={() => handleMenuClick('wiwiti')} className="overlay-btn" aria-label="Wiwiti"></button>
            <button onClick={() => handleMenuClick('profil')} className="overlay-btn" aria-label="Profil Pangembang"></button>
          </div>
        </div>
      </div>

      {/* Top Controls placed AFTER content to guarantee they are on top in DOM order */}
      <button className="info-btn" onClick={handleInfo} type="button" aria-label="Information">
        <Image src="/menu_assets/information.png" alt="Information" fill sizes="80px" className="icon-img" priority />
      </button>

      <Music className="sound-btn" />

      {/* Logout button placed in bottom right */}
      <button className="logout-btn" onClick={handleLogout} type="button" aria-label="Log Out">
        <Image src="/menu_assets/log_out .png" alt="Log Out" fill sizes="80px" className="icon-img" priority />
      </button>
    </div>
  );
}
