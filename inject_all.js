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
  let changed = false;

  // Don't modify if it already has saveUlasan (like Babak 1 we just did)
  if (content.includes('saveUlasan')) continue;

  if (content.includes('const correct = ')) {
    // Add import
    if (!content.includes("import { saveUlasan }")) {
       content = content.replace(/(import .*?;?\n)/, "$1import { saveUlasan } from '@/utils/ulasanStorage';\n");
    }

    // Replace `const correct = ...;` and `setIsAnswerCorrect(correct);`
    // with injected logic.
    const regex = /(const correct = [^;]+;\s*setIsAnswerCorrect\(correct\);)/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, `$1\n\n    // Injected by PDF Generator\n    const qText = "Evaluasi " + (typeof window !== 'undefined' ? window.location.pathname : "");\n    saveUlasan(qText, "Jawaban disimpen", correct ? "Bener" : "Salah");\n`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log("Updated", file);
  }
}

console.log("Total updated:", count);
