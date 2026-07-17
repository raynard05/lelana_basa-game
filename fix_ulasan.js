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

  // Type 1: handleOptionClick (like babak1/page1)
  if (content.includes('const handleOptionClick') && content.includes('options.map') && !file.includes('babak1\\page1')) {
    // We want to replace the generic injection
    const genericRegex = /\/\/ Injected by PDF Generator[\s\S]*?saveUlasan[^;]+;/g;
    if (genericRegex.test(content)) {
      // Find the question. Usually not explicitly stored in a variable, but let's just use "Analisis paraga Jaka Slewah" or something general, or extract from JSX if possible.
      // Let's just use a fixed string based on the folder since type 1 is usually "Analisis Paraga"
      const replacement = `
    const questionText = 'Analisis Paraga';
    const userAns = options.find(o => o.id === optionId)?.label || optionId;
    const correctAns = correct ? userAns : 'Luwih tuwa / Sapantaran / Luwih enom'; // Fallback
    saveUlasan(questionText, userAns, correctAns);
`;
      content = content.replace(genericRegex, replacement);
      changed = true;
    }
  }

  // Type 2: handleOptionSelect (like babak1/page3)
  if (content.includes('const handleOptionSelect') && content.includes('optionsData') && !file.includes('babak1\\page3')) {
    const genericRegex = /\/\/ Injected by PDF Generator[\s\S]*?saveUlasan[^;]+;/g;
    if (genericRegex.test(content)) {
      // Find dialogueText in the file
      const dialogMatch = content.match(/dialogueText=["']([^"']+)["']/);
      const dialog = dialogMatch ? dialogMatch[1] : 'Dialog Karakter';
      
      const actorMatch = content.match(/actorName=["']([^"']+)["']/);
      const actor = actorMatch ? actorMatch[1] : 'Karakter';

      const replacement = `
    const questionText = '${actor}: "${dialog}"';
    const userAns = optionsData.find(o => o.id === id)?.text || id;
    const correctAns = correct ? userAns : optionsData.find(o => o.id === 'A')?.text || 'Ngoko Lugu'; // Fallback approximation
    saveUlasan(questionText, userAns, correctAns);
`;
      content = content.replace(genericRegex, replacement);
      changed = true;
    }
  }

  // Type 3: handleTranscript (like babak1/page4)
  if (content.includes('const handleTranscript') && content.includes('earnedPoints > 0') && !file.includes('babak1\\page4')) {
    const genericRegex = /\/\/ Injected by PDF Generator[\s\S]*?saveUlasan[^;]+;/g;
    if (genericRegex.test(content)) {
      const dialogMatch = content.match(/dialogueText=["']([^"']+)["']/);
      const dialog = dialogMatch ? dialogMatch[1] : 'Dialog Karakter';
      
      const actorMatch = content.match(/actorName=["']([^"']+)["']/);
      const actor = actorMatch ? actorMatch[1] : 'Karakter';

      const replacement = `
    const questionText = '${actor}: "${dialog}"';
    const userAns = text;
    const correctAns = 'Lisan Bener';
    saveUlasan(questionText, userAns, correctAns);
`;
      content = content.replace(genericRegex, replacement);
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
