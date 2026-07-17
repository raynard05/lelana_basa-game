const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (fullPath.includes('babak')) {
        getFiles(fullPath, filesList);
      }
    } else if (fullPath.endsWith('page.tsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allPages = getFiles(appDir);
let count = 0;

for (const file of allPages) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes("const questionText = 'Analisis Paraga';")) {
    content = content.replace(
      "const questionText = 'Analisis Paraga';", 
      "const questionText = typeof nama_karakter !== 'undefined' ? `Analisis Paraga ${nama_karakter}` : 'Analisis Paraga';"
    );
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log("Updated questionText in", file);
  }
}

console.log("Total updated (Analisis Paraga):", count);
