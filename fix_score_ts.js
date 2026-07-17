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

  if (content.includes('typeof earnedPoints !== \'undefined\'')) {
    const hasEarnedPoints = content.includes('let earnedPoints') || content.includes('const earnedPoints') || content.includes('earnedPoints =');
    
    // Regex to match the problematic ternary expression
    const regex = /typeof earnedPoints !== 'undefined' \? earnedPoints : \(attempts === 1 \? 100 : 75\)/g;
    
    if (hasEarnedPoints) {
      content = content.replace(regex, "earnedPoints");
    } else {
      content = content.replace(regex, "(attempts === 1 ? 100 : (typeof attempts !== 'undefined' && attempts === 2 ? 75 : 50))");
      // Wait, just in case attempts is also not defined (like some narration pages, though they probably don't have this score logic), 
      // but in multiple choice it's always attempts. Let's just use (attempts === 1 ? 100 : 75)
      content = content.replace(/\(attempts === 1 \? 100 : \(typeof attempts !== 'undefined' && attempts === 2 \? 75 : 50\)\)/g, "(attempts === 1 ? 100 : 75)");
      // Let's re-do the safe replacement:
    }
    
    // To be perfectly safe against formatting:
    content = content.replace(/typeof earnedPoints !== 'undefined'\s*\?\s*earnedPoints\s*:\s*\(attempts === 1 \? 100 : 75\)/g, 
      hasEarnedPoints ? "earnedPoints" : "(attempts === 1 ? 100 : 75)"
    );

    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log("Fixed TS error in", file);
  }
}

console.log("Total fixed:", count);
