'use client';

import Image from 'next/image';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './profilpengembang.css';

export default function ProfilPengembangPage() {
  return (
    <div className="pp-container">
      <Home className="pp-home-btn" />
      <Music className="pp-music-btn" />
      
      <div className="pp-content">
        <div className="pp-title-container">
          <Image 
            src="/profilpengembang/profilpengembangtag.png" 
            alt="Profil Pangembang" 
            width={600} 
            height={150} 
            className="pp-title-img"
            priority
          />
        </div>

        <div className="pp-board-container">
          <Image
            src="/profilpengembang/frame.png"
            alt="Board"
            width={1200}
            height={800}
            className="pp-board-bg"
            priority
          />
          
          <div className="pp-board-content">
            <div className="pp-name-container">
              <Image 
                src="/profilpengembang/namapengembang.png" 
                alt="Nama Pengembang" 
                width={500} 
                height={150} 
                className="pp-name-img"
              />
            </div>
            
            <div className="pp-desc-container">
              <Image 
                src="/profilpengembang/deskripsiprofil.png" 
                alt="Deskripsi Profil" 
                width={900} 
                height={400} 
                className="pp-desc-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
