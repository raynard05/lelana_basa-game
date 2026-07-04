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
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace desktop desktop spacing 
  // from `calc(5vw + 12vh + 2vw)` or similar without max
  content = content.replace(/right:\s*calc\(5vw \+ 12vh \+ 2vw\);/g, 'right: calc(5vw + clamp(50px, 12vh, 80px) + 10px);');
  
  // Also if we accidentally put 5vw for mobile instead of 4vw
  content = content.replace(/right:\s*calc\(5vw \+ 14vw \+ 2vw\)\s*!important;/g, 'right: calc(4vw + 14vw + 3vw) !important;');

  // If there's any stray old formatting
  content = content.replace(/right:\s*calc\(4vw \+ 14vw \+ [0-9]+vw\)\s*!important;/g, 'right: calc(4vw + 14vw + 2vw) !important;');

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed spacing in:', file);
      count++;
  }
});

console.log(`Fixed ${count} files.`);
