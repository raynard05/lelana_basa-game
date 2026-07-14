'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Skip from '@/components/Skip';
import './main_page.css';
import Image from 'next/image';

const gelombang1Text = `Jaka Tulus, pawongan enom kang urip karo ibune yaiku Wandan Wanguri ing desa Karang Kejambon. Jaka Tulus awit cilik kerep diece karo kanca-kancane amarga wiwit cilik ora ngerti sapa sejatine bapake. Amarga kerep diece karo kancane kuwi, Jaka Tulus kelara-lara atine. Jaka Tulus ngrusak lan njalari akeh perkara ing desane. Mula, masarakat ing desane menehi julukan Kebo Kicak, amarga solahe kaya kebo sing mencak-mencak.`;

const gelombang2Paragraphs = [
  `Rumangsa wis gawe rusak desane, Jaka Tulus nduweni tekad kanggo lelana nggoleki sapa sejatine bapake. Kanthi sangu crita saka ibune yen bapake Jaka Tulus kuwi manggon ana ing Praja Majapahit, dheweke budhal ninggalake ibu lan desane.`,
  `Kira-kira, sasuwene Jaka Tulus lelana bakal nemoni pepalang apa wae ya?`,
  `Banjur apa Jaka Tulus bisa nemokake bapake lan diakoni minangka anake?`,
  `Supaya bisa mangerteni kepriye pungkasane crita saka Jaka Tulus sing lelana iki, ayo! ngrampungake misi-misi ing dolanan iki!`
];

const words1 = gelombang1Text.trim().split(/\s+/);
const paragraphs2 = gelombang2Paragraphs.map(p => p.trim().split(/\s+/));
const allWords2 = paragraphs2.flat();

const audioSrc = '/audio/babak1/sinopsis.mp3';

export default function MainPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

  // 2. Play narration audio and sync time updates
  useEffect(() => {
    if (isValidating) return;

    // Dispatch global pause for background music
    window.dispatchEvent(new Event('pauseBackgroundMusic'));

    const audio = audioRef.current;
    if (!audio) return;

    // Force load the correct audio source
    audio.load();

    const handlePlay = () => {
      window.dispatchEvent(new Event('pauseBackgroundMusic'));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      audio.volume = 1.0; // Ensure max volume
    };

    const handleEnded = () => {
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Play automatically
    audio.play().catch((err) => {
      console.warn('Autoplay prevented:', err);
    });

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      // Resume background music on cleanup
      window.dispatchEvent(new Event('resumeBackgroundMusic'));
    };
  }, [isValidating, audioSrc]);

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

  const activeDuration = duration || 60;
  const splitTime = activeDuration * 0.45;
  const isWave2 = currentTime >= splitTime;
  const showBanner = isWave2 && (currentTime >= activeDuration - 0.5);

  return (
    <div className="mainpage-container">
      {/* Hidden narration audio */}
      <audio ref={audioRef} src={audioSrc} style={{ display: 'none' }} />

      {/* Top Controls */}
      <Home className="mainpage-home-btn" />
      <Music className="mainpage-music-btn" />
      <Skip onClick={handleSkip} className="mainpage-skip-btn" />

      {/* Main Content Card Scroll Layout */}
      <div className="mainpage-card-frame">
        <div className="mainpage-sinopsis-title">
          <Image src="/main_page_assets/sinopsis.png" alt="Sinopsis" width={300} height={100} priority unoptimized />
        </div>
        <div className="mainpage-text-container">
          {!isWave2 ? (
            <p className="mainpage-narration-paragraph">
              {words1.map((word, idx) => {
                const t_i = (idx / words1.length) * splitTime;
                const isRevealed = currentTime >= t_i;
                return (
                  <span
                    key={idx}
                    className={`mainpage-narration-word ${isRevealed ? 'mainpage-revealed' : ''}`}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          ) : (
            <>
              {(() => {
                let globalIndex = 0;
                const N2 = allWords2.length;
                return paragraphs2.map((paraWords, paraIdx) => (
                  <p key={paraIdx} className="mainpage-narration-paragraph">
                    {paraWords.map((word, wordIdx) => {
                      const j = globalIndex++;
                      const t_j = splitTime + (j / N2) * (activeDuration - splitTime);
                      const isRevealed = currentTime >= t_j;
                      return (
                        <span
                          key={wordIdx}
                          className={`mainpage-narration-word ${isRevealed ? 'mainpage-revealed' : ''}`}
                        >
                          {word}{' '}
                        </span>
                      );
                    })}
                  </p>
                ));
              })()}
              {showBanner && (
                <div className="mainpage-sugeng-makarya-banner">
                  Sugeng Makarya Rekk!!!!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
