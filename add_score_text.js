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

  // We are looking for: saveUlasan(questionText, userAns, correctAns);
  // Or saveUlasan(qText, "Jawaban disimpen", correct ? "Bener" : "Salah");
  
  const regex = /saveUlasan\(([^,]+),\s*([^,]+),\s*([^)]+)\);/g;
  
  if (regex.test(content) && !content.includes('scoreText = `skor')) {
    content = content.replace(regex, (match, q, u, c) => {
      // If it already has 4 arguments, skip
      if (match.split(',').length > 3 && !match.includes('correct ?')) { // well, simple heuristic
         // wait, it's safer to just replace it with the logic block
      }
      
      return `
    let __scoreText = 'skor : 0';
    if (correct && typeof window !== 'undefined') {
       const __tmpEarned = typeof earnedPoints !== 'undefined' ? earnedPoints : (attempts === 1 ? 100 : 75);
       const __streakStr = localStorage.getItem('game_streak') || '0';
       const __currentStreak = parseInt(__streakStr, 10) + 1;
       const __isStreak = (__tmpEarned === 100) && (__currentStreak === 3);
       __scoreText = \`skor : \${__tmpEarned}+\` + (__isStreak ? \` , streak : 25+\` : \`\`);
    }
    saveUlasan(${q}, ${u}, ${c}, __scoreText);`;
    });

    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log("Updated score text in", file);
  }
}

console.log("Total updated (score text):", count);
