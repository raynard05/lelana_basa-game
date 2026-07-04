const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      getFiles(file, files);
    } else if (file.endsWith('.css')) {
      files.push(file);
    }
  }
  return files;
}

const files = getFiles('app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace desktop spacing
  content = content.replace(/right:\s*calc\([^)]+\)/g, (match) => {
      // If it looks like a music button spacing calculation (has +)
      if (match.includes('+')) {
          // If it's a portrait media query spacing (12vw or 14vw)
          if (match.includes('12vw') || match.includes('14vw') || match.includes('4vw')) {
              return 'right: calc(5vw + 14vw + 2vw)';
          }
          // Desktop spacing
          return 'right: calc(5vw + 12vh + 2vw)';
      }
      return match;
  });

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated spacing in:', file);
  }
});
