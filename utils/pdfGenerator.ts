import { PDFDocument, rgb } from 'pdf-lib';
import { UlasanItem } from './ulasanStorage';

export interface UserData {
  nama_lengkap: string;
  absen: string;
  kelas: string;
  biji: string;
  wektu: string;
}

export async function generateStudentPDF(userData: UserData, ulasanData: UlasanItem[]) {
  // 1. Fetch the existing PDF template
  const url = '/document/dokumen_siswa_an.pdf';
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  // 2. Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Use a standard font
  const helveticaFont = await pdfDoc.embedFont('Helvetica');
  const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');

  // Get all pages
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Colors
  const textColor = rgb(0, 0, 0);

  // --- Page 1: User Data ---
  // We need to place Name, Absen, Kelas, Biji, Wektu.

  const startX = 110; // X coordinate for values (moved left to align with colon)
  let startY = 672;   // Y coordinate for first value (Jeneng)
  const lineHeight = 22; // Estimated line height for the template

  const fontSize = 12;

  firstPage.drawText(userData.nama_lengkap || '-', { x: startX, y: startY, size: fontSize, font: helveticaBold, color: textColor });
  firstPage.drawText(userData.absen || '-', { x: startX, y: startY - (lineHeight * 1), size: fontSize, font: helveticaBold, color: textColor });
  firstPage.drawText(userData.kelas || '-', { x: startX, y: startY - (lineHeight * 2), size: fontSize, font: helveticaBold, color: textColor });
  firstPage.drawText(userData.biji || '-', { x: startX, y: startY - (lineHeight * 3), size: fontSize, font: helveticaBold, color: textColor });
  firstPage.drawText(userData.wektu || '-', { x: startX, y: startY - (lineHeight * 4), size: fontSize, font: helveticaBold, color: textColor });

  // --- Ulasan Materi ---
  let currentY = 490;
  let currentPageIndex = 0;
  let currentPage = pages[currentPageIndex];

  const questionX = 55;
  const answerX = 75;
  const ulasanFontSize = 9;

  // Function to wrap text
  const wrapText = (text: string, maxWidth: number, font: any, size: number) => {
    const words = text.split(' ');
    let lines: string[] = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + " " + word, size);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, font: any, isBold: boolean = false) => {
    const lines = wrapText(text, maxWidth, font, ulasanFontSize);
    let tempY = y;
    for (const line of lines) {
      currentPage.drawText(line, {
        x,
        y: tempY,
        size: ulasanFontSize,
        font: isBold ? helveticaBold : helveticaFont,
        color: textColor
      });
      tempY -= 12; // Line spacing
    }
    return tempY; // Return the new Y after drawing this block
  };

  const checkPageBreak = (requiredSpace: number) => {
    // If Y goes below 50, we move to the next page
    if (currentY - requiredSpace < 50) {
      currentPageIndex++;
      if (currentPageIndex < pages.length) {
        currentPage = pages[currentPageIndex];
        // Atur Y di bawah ini agar teks halaman 2 dst. tidak menabrak papan nama "Lelana Basa"
        currentY = 680; // Ubah angka ini (sebelumnya 730) untuk mengatur batas atas halaman
      }
    }
  };

  const getNormalizedKunciJawaban = (question: string, rawKunci: string): string => {
    if (question.toLowerCase().includes('analisis paraga')) {
      return rawKunci;
    }

    const q = question.toLowerCase();

    // Babak 1
    if (q.includes('aja cedhak-cedhak aku')) return 'Ngoko Lugu';
    if (q.includes('halah, rasah omong')) return 'Ngoko Lugu';
    if (q.includes('wis, ndang ngaliha, aku ora sudi')) return 'Ngoko Lugu';

    // Babak 2
    if (q.includes('aja nangis wae, mengko dadi rerasane')) return 'Krama Alus';
    if (q.includes('saiki budhala menyang kraton majapahit')) return 'Krama Alus';

    // Babak 4
    if (q.includes('kene mampir dhisik, le')) return 'Krama Alus';
    if (q.includes('yen kepengin meguru ing kene')) return 'Krama Alus';

    // Babak 5
    if (q.includes('he, kebo kicak! aku ora trima')) return 'Ngoko Alus';
    if (q.includes('rasah kakehan omong! ayo perang tandhing')) return 'Ngoko Alus';
    if (q.includes('dina iki kowe bakal kalah ing tanganku')) return 'Ngoko Lugu';

    // Babak 7 (Prajurit)
    if (q.includes('regol kraton kene')) return 'Krama Lugu';
    if (q.includes('ana urusan apa? bocah kaya awakmu')) return 'Krama Lugu';
    if (q.includes('tinimbang taksuwunake paukuman')) return 'Krama Lugu';

    // Babak 7 (Patih)
    if (q.includes('kok wani gawe geger ing kene')) return 'Krama Alus';
    if (q.includes('ngaku dadi anakku? ora segampang kuwi')) return 'Krama Alus';
    if (q.includes('kalahna bajul ijo lan gawanen mulih watu ireng')) return 'Krama Alus';

    // Babak 9 (Patih)
    if (q.includes('anakku dhewe')) return 'Krama Alus';

    // Fallbacks if rawKunci contains ragam
    const rawLower = (rawKunci || '').toLowerCase();
    if (rawLower.includes('ngoko alus')) return 'Ngoko Alus';
    if (rawLower.includes('ngoko lugu')) return 'Ngoko Lugu';
    if (rawLower.includes('krama alus')) return 'Krama Alus';
    if (rawLower.includes('krama lugu')) return 'Krama Lugu';

    return rawKunci;
  };

  for (let i = 0; i < ulasanData.length; i++) {
    const item = ulasanData[i];

    // Estimate space needed
    checkPageBreak(60);

    if (currentPageIndex >= pages.length) break; // Reached end of template

    // Draw Question
    const qText = `${i + 1}. ${item.question}`;
    currentY = drawWrappedText(qText, questionX, currentY, 400, helveticaBold, true);

    // Draw Wangsulan
    const wText = `Wangsulan: ${item.wangsulan}`;
    currentY = drawWrappedText(wText, answerX, currentY, 380, helveticaFont);

    // Draw Kunci Jawaban (Normalized to Ragam Bahasa)
    const normalizedKunci = getNormalizedKunciJawaban(item.question, item.kunciJawaban);
    const kText = `Kunci jawaban: ${normalizedKunci}`;
    currentY = drawWrappedText(kText, answerX, currentY, 380, helveticaFont);

    // Draw Score
    if (item.scoreText) {
      currentY -= 2;
      currentY = drawWrappedText(item.scoreText, answerX, currentY, 380, helveticaBold);
    }

    currentY -= 10; // Extra spacing between questions
  }

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Create a blob and trigger download
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `dokumen_siswa_an_${userData.nama_lengkap.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl);
}
