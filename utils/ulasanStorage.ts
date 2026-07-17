export interface UlasanItem {
  question: string;
  wangsulan: string;
  kunciJawaban: string;
  scoreText?: string;
}

export function saveUlasan(question: string, wangsulan: string, kunciJawaban: string, scoreText?: string) {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = localStorage.getItem('ulasan_materi');
    const ulasanData = existing ? JSON.parse(existing) : [];
    
    // Check if question already exists to avoid duplicates if user refreshes/retries
    const existingIndex = ulasanData.findIndex((item: any) => item.question === question);
    if (existingIndex >= 0) {
      ulasanData[existingIndex] = { question, wangsulan, kunciJawaban, scoreText };
    } else {
      ulasanData.push({ question, wangsulan, kunciJawaban, scoreText });
    }
    
    localStorage.setItem('ulasan_materi', JSON.stringify(ulasanData));
  } catch (err) {
    console.error('Error saving ulasan:', err);
  }
}
