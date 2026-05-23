'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './menu.css';

export default function MenuPage() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const enableFullscreen = () => {
      if (!document.fullscreenElement) {
        const docEl = document.documentElement as any;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch((err: any) => console.log('Fullscreen error:', err));
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen();
        }
      }
      // Remove listeners after the first interaction has triggered
      window.removeEventListener('click', enableFullscreen);
      window.removeEventListener('touchstart', enableFullscreen);
    };

    window.addEventListener('click', enableFullscreen);
    window.addEventListener('touchstart', enableFullscreen);

    return () => {
      window.removeEventListener('click', enableFullscreen);
      window.removeEventListener('touchstart', enableFullscreen);
    };
  }, []);

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
        router.push('/game');
        break;
      case 'profil':
        router.push('/profil');
        break;
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    console.log('Sound toggled');
  };

  const handleInfo = () => {
    console.log('Info clicked');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/');
  };

  return (
    <div className="menu-container">
      {/* Main Content Center - Rendered first so absolute buttons sit on top in DOM order */}
      <div className="menu-content">
        <div className="logo-container">
          <Image src="/main/lelana_basa.png" alt="Lelana Basa Logo" width={500} height={300} className="logo-img" priority />
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

      <button className="sound-btn" onClick={toggleSound} type="button" aria-label="Sound Toggle">
        <Image src={isSoundOn ? '/main/sound_on.png' : '/main/sound_off.png'} alt="Sound Toggle" fill sizes="80px" className="icon-img" priority />
      </button>

      {/* Logout button placed in bottom right */}
      <button className="logout-btn" onClick={handleLogout} type="button" aria-label="Log Out">
        <Image src="/menu_assets/log_out .png" alt="Log Out" fill sizes="80px" className="icon-img" priority />
      </button>
    </div>
  );
}
