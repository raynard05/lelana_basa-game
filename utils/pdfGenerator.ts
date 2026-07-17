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
  const url = '/document/dokumen-siswa.pdf';
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
  let startY = 680;   // Y coordinate for first value (Jeneng)
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
  const ulasanFontSize = 10;

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
      tempY -= 14; // Line spacing
    }
    return tempY; // Return the new Y after drawing this block
  };

  const checkPageBreak = (requiredSpace: number) => {
    // If Y goes below 100, we move to the next page
    if (currentY - requiredSpace < 100) {
      currentPageIndex++;
      if (currentPageIndex < pages.length) {
        currentPage = pages[currentPageIndex];
        // Atur Y di bawah ini agar teks halaman 2 dst. tidak menabrak papan nama "Lelana Basa"
        currentY = 660; // Ubah angka ini (sebelumnya 730) untuk mengatur batas atas halaman
      }
    }
  };

  for (let i = 0; i < ulasanData.length; i++) {
    const item = ulasanData[i];

    // Estimate space needed
    checkPageBreak(80);

    if (currentPageIndex >= pages.length) break; // Reached end of template

    // Draw Question
    const qText = `${i + 1}. ${item.question}`;
    currentY = drawWrappedText(qText, questionX, currentY, 400, helveticaBold, true);

    // Draw Wangsulan
    const wText = `Wangsulan: ${item.wangsulan}`;
    currentY = drawWrappedText(wText, answerX, currentY, 380, helveticaFont);

    // Draw Kunci Jawaban
    const kText = `Kunci jawaban: ${item.kunciJawaban}`;
    currentY = drawWrappedText(kText, answerX, currentY, 380, helveticaFont);

    // Draw Score
    if (item.scoreText) {
      currentY -= 2;
      currentY = drawWrappedText(item.scoreText, answerX, currentY, 380, helveticaBold);
    }

    currentY -= 15; // Extra spacing between questions
  }

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Create a blob and trigger download
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `Dokumen_Siswa_${userData.nama_lengkap.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl);
}
