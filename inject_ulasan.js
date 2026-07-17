const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('page.tsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allPages = getFiles(appDir);

let modifiedCount = 0;

for (const filePath of allPages) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add import if not exists
  if (content.includes('handleOptionSelect') || content.includes('handleOptionClick')) {
    if (!content.includes("import { saveUlasan }")) {
      content = content.replace(/(import .*?;?\n)/, "$1import { saveUlasan } from '@/utils/ulasanStorage';\n");
      changed = true;
    }
  }

  // Inject into handleOptionSelect (which usually has optionsData)
  if (content.includes('const handleOptionSelect = (id:')) {
    const injection = `
    const selectedText = optionsData.find(opt => opt.id === id)?.text || id;
    const correctOptionId = id === 'A' ? 'A' : (id === 'B' ? 'B' : (id === 'C' ? 'C' : 'D')); // We need actual correct id, let's extract it from 'const correct = id === X'
    
    // Simplification for the script: 
    // Usually correct is defined right after. We can parse it.
`;
  }

}

// Wait, standardizing this via script might be tricky because the "question", "wangsulan", and "kunciJawaban" are hardcoded or mapped differently in each file.
