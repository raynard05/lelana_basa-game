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

  // Check if saveUlasan is used but NOT imported
  if (content.includes('saveUlasan') && !content.includes("import { saveUlasan } from '@/utils/ulasanStorage';")) {
    
    // Fallback import injection strategy (works with CRLF or LF)
    if (content.includes("'use client';")) {
       content = content.replace("'use client';", `'use client';\r\nimport { saveUlasan } from '@/utils/ulasanStorage';`);
    } else if (content.includes('"use client";')) {
       content = content.replace('"use client";', `"use client";\r\nimport { saveUlasan } from '@/utils/ulasanStorage';`);
    } else {
       // if no use client, just prepend
       content = `import { saveUlasan } from '@/utils/ulasanStorage';\r\n` + content;
    }

    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log("Fixed import in", file);
  }
}

console.log("Total updated (fixed imports):", count);
