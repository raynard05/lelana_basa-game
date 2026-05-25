const fs = require('fs');
const path = require('path');

function getWebpDimensions(buffer) {
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') {
    return null;
  }
  const type = buffer.toString('ascii', 12, 16);
  if (type === 'VP8X') {
    const width = buffer.readUIntLE(24, 3) + 1;
    const height = buffer.readUIntLE(27, 3) + 1;
    return { type, width, height };
  } else if (type === 'VP8L') {
    // Lossless: 5 bits signature, 14 bits width, 14 bits height
    const b12 = buffer[20];
    const b13 = buffer[21];
    const b14 = buffer[22];
    const b15 = buffer[23];
    const width = 1 + (((b13 & 0x3F) << 8) | b12);
    const height = 1 + (((b15 & 0x0F) << 10) | (b14 << 2) | ((b13 & 0xC0) >> 6));
    return { type, width, height };
  } else if (type === 'VP8 ') {
    // Lossy
    const width = buffer.readUInt16LE(26);
    const height = buffer.readUInt16LE(28);
    return { type, width, height };
  }
  return { type };
}

const dir = 'd:/lelana basa/lelanabasa_1.1/public/babak1/pages_2_assets';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.webp')) {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    console.log(`${file}:`, getWebpDimensions(buffer));
  }
});
