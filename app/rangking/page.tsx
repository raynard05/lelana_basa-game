'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { submitScoreAndGetLeaderboard } from '@/app/actions/rank';
import { getCurrentUser } from '@/app/actions/auth';
import { FileDown } from 'lucide-react';
import { generateStudentPDF, UserData } from '@/utils/pdfGenerator';
import { UlasanItem } from '@/utils/ulasanStorage';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './rangking.css';

export default function RangkingPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentRunId, setCurrentRunId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function processGameEnd() {
      // 1. Get Score
      const savedScore = localStorage.getItem('game_score');
      const score = savedScore ? parseInt(savedScore, 10) : 0;

      // 2. Get Total Time Spent
      let totalSeconds = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.endsWith('_spent')) {
          const spent = parseInt(localStorage.getItem(key) || '0', 10);
          if (!isNaN(spent)) {
            totalSeconds += spent;
          }
        }
      }

      // Fallback if no time recorded (e.g. debugging)
      if (totalSeconds === 0) {
        totalSeconds = 120; // default 2 mins for empty runs
      }

      // 3. Submit to server
      const result = await submitScoreAndGetLeaderboard(score, totalSeconds);
      if (result.success && result.leaderboard) {
        setLeaderboard(result.leaderboard);
        setCurrentRunId(result.currentRunId);
      } else {
        console.error("Failed to fetch ranking:", result.error);
        // Fallback UI or redirect
      }

      // Fetch user session for absen and name
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }

      setIsLoading(false);
    }

    processGameEnd();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleDownloadPdf = async () => {
    if (isPdfLoading) return;
    setIsPdfLoading(true);

    try {
      // Current run data
      const myRun = leaderboard.find(r => r.id === currentRunId);

      const userData: UserData = {
        nama_lengkap: myRun ? myRun.nama_user : (currentUser?.nama_lengkap || '-'),
        absen: currentUser?.nomor_absen ? currentUser.nomor_absen.toString() : '-',
        kelas: currentUser?.kelas || (myRun ? myRun.kelas : '-'),
        biji: myRun ? myRun.poin.toString() : '-',
        wektu: myRun ? formatTime(myRun.waktu_penyelesaian) : '-'
      };

      const savedUlasan = localStorage.getItem('ulasan_materi');
      const ulasanData: UlasanItem[] = savedUlasan ? JSON.parse(savedUlasan) : [];

      await generateStudentPDF(userData, ulasanData);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Gagal nggawe PDF.');
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem('ulasan_materi');
    localStorage.removeItem('game_score');
    router.replace('/menu');
  };

  if (isLoading) {
    return (
      <div className="rangking-loading">
        Nyiyapake Biji lan Wektu Garapan....
      </div>
    );
  }

  return (
    <div className="rangking-page-container">
      {/* Top Left Controls */}
      <button
        onClick={handleGoHome}
        type="button"
        className="rangking-nav-btn rangking-home-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        aria-label="Go to Menu"
      >
        <Image
          src="/main/Home.png"
          alt="Home"
          fill
          sizes="80px"
          style={{ objectFit: 'contain' }}
          priority
          unoptimized
        />
      </button>
      <Music className="rangking-nav-btn rangking-music-btn" />

      {/* Top Right PDF Download Button */}
      <div className="rangking-pdf-btn" onClick={handleDownloadPdf} style={{ cursor: isPdfLoading ? 'wait' : 'pointer' }}>
        <FileDown size={36} color="#4A2E12" strokeWidth={2.5} />
        <div className="rangking-pdf-text" style={{ textAlign: 'left', width: '100%' }}>
          {isPdfLoading ? 'Nyiyapake...' : (
            <>Unduh PDF<br />Ulasan Materi</>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="rangking-title-container">
        <Image
          src="/perangkingan/title_perangkingan.webp"
          alt="Perangkingan"
          fill
          className="rangking-title-bg"
          unoptimized
        />
      </div>

      {/* Board */}
      <div className="rangking-board-container">
        {/* Header */}
        <div className="rangking-table-header">
          <div>Peringkat</div>
          <div>Jeneng Siswa</div>
          <div>Kelas</div>
          <div>Poin</div>
          <div>Wektu</div>
        </div>

        {/* Rows */}
        {leaderboard.map((row) => {
          const isCurrentUser = row.id === currentRunId;
          const rank = row.peringkat;

          return (
            <div
              key={row.id}
              className={`rangking-row ${isCurrentUser ? 'rangking-row-highlight' : ''}`}
            >
              <div className="rangking-medal-col">
                {rank === 1 && (
                  <div className="rangking-medal-img">
                    <Image src="/perangkingan/juara_1.png" alt="Juara 1" fill unoptimized />
                  </div>
                )}
                {rank === 2 && (
                  <div className="rangking-medal-img">
                    <Image src="/perangkingan/juara_2.png" alt="Juara 2" fill unoptimized />
                  </div>
                )}
                {rank === 3 && (
                  <div className="rangking-medal-img">
                    <Image src="/perangkingan/juara_3.png" alt="Juara 3" fill unoptimized />
                  </div>
                )}
                {rank > 3 && (
                  <div className="rangking-circle">{rank}</div>
                )}
              </div>
              <div className="rangking-col-text text-left">{row.nama_user}</div>
              <div className="rangking-col-text">{row.kelas}</div>
              <div className="rangking-score-col">
                <div className="rangking-score-badge">{row.poin}</div>
              </div>
              <div className="rangking-col-text">
                {formatTime(row.waktu_penyelesaian)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
