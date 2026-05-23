'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './menu.css';

export default function MenuPage() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      // Check if landscape and mobile size (800x360 or similar)
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobileSize = window.innerWidth <= 950 && window.innerHeight <= 450;
      setIsMobileLandscape(isLandscape && isMobileSize);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);

  const handleMenuClick = (menu: string) => {
    console.log('Menu clicked:', menu);
    // Navigate to respective pages
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
    // Add sound toggle logic here
  };

  const handleLogout = () => {
    // Clear any session/auth data
    console.log('Logging out...');
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="menu-container">
      {/* Background Image */}
      <div className="menu-background">
        <Image
          src={isMobileLandscape ? '/menu_assets/bg_menu_mobile.png' : '/menu_assets/bg_menu.webp'}
          alt="Background Menu"
          fill
          priority
          className="background-image"
        />
      </div>

      {/* Top Bar */}
      <div className="menu-top-bar">
        {/* Information Button - Kiri Atas */}
        <button className="info-button" onClick={() => console.log('Info clicked')}>
          <Image
            src="/menu_assets/information.png"
            alt="Information"
            width={50}
            height={50}
            className="info-icon"
          />
        </button>

        {/* Sound Toggle - Kanan Atas */}
        <button className="sound-button" onClick={toggleSound}>
          <Image
            src={isSoundOn ? '/main/sound_on.png' : '/main/sound_off.png'}
            alt={isSoundOn ? 'Sound On' : 'Sound Off'}
            width={50}
            height={50}
            className="sound-icon"
          />
        </button>
      </div>

      {/* Logout Button - Pojok Bawah Kanan */}
      <div className="menu-bottom-bar">
        <button className="logout-button" onClick={handleLogout}>
          <Image
            src="/menu_assets/log_out .png"
            alt="Logout"
            width={100}
            height={100}
            className="logout-icon"
          />
        </button>
      </div>

      {/* Content Overlay */}
      <div className="menu-content">
        {/* Lelana Basa Logo */}
        <div className="menu-logo-container">
          <Image
            src="/main/lelana_basa.png"
            alt="Lelana Basa"
            width={400}
            height={250}
            className="menu-logo"
          />
        </div>

        {/* Subtitle Text */}
        <div className="menu-subtitle">
          <Image
            src="/menu_assets/teks_menu.png"
            alt="Sinau Undha Usuk Basa Jawa"
            width={350}
            height={60}
            className="subtitle-image"
          />
        </div>

        {/* Menu Options */}
        <div className="menu-options-container">
          <Image
            src="/menu_assets/opsi_menu.png"
            alt="Menu Options"
            width={400}
            height={300}
            className="menu-options-image"
            onClick={(e) => {
              // Calculate which menu was clicked based on position
              const rect = e.currentTarget.getBoundingClientRect();
              const y = e.clientY - rect.top;
              const height = rect.height;
              const section = Math.floor((y / height) * 4);
              
              const menus = ['materi', 'sinopsis', 'wiwiti', 'profil'];
              handleMenuClick(menus[section]);
            }}
          />
          
          {/* Clickable overlay buttons */}
          <div className="menu-buttons-overlay">
            <button 
              className="menu-button menu-button-1"
              onClick={() => handleMenuClick('materi')}
            >
              <span className="sr-only">Materi</span>
            </button>
            <button 
              className="menu-button menu-button-2"
              onClick={() => handleMenuClick('sinopsis')}
            >
              <span className="sr-only">Sinopsis Carita</span>
            </button>
            <button 
              className="menu-button menu-button-3"
              onClick={() => handleMenuClick('wiwiti')}
            >
              <span className="sr-only">Wiwiti</span>
            </button>
            <button 
              className="menu-button menu-button-4"
              onClick={() => handleMenuClick('profil')}
            >
              <span className="sr-only">Profil Pangembang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
