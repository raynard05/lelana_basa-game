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

  const isNarration = file.includes('narration') || file.includes('main_page');

  // Replace desktop music button position
  if (isNarration) {
      content = content.replace(/left:\s*calc\(5vw \+ clamp\(50px, 12vh, 80px\) \+ 10px\);/g, 'right: calc(5vw + clamp(50px, 12vh, 80px) + 10px);');
      content = content.replace(/left:\s*calc\(4vw \+ 14vw \+ [0-9]+vw\)\s*!important;/g, 'right: calc(4vw + 14vw + 2vw) !important;');
      // Handle edge cases where I used 5vw + 14vw + 2vw
      content = content.replace(/left:\s*calc\(5vw \+ 14vw \+ [0-9]+vw\)\s*!important;/g, 'right: calc(4vw + 14vw + 2vw) !important;');
  } else {
      content = content.replace(/left:\s*calc\(5vw \+ clamp\(50px, 12vh, 80px\) \+ 10px\);/g, 'right: calc(5vw + 250px);');
      content = content.replace(/left:\s*calc\(4vw \+ 14vw \+ [0-9]+vw\)\s*!important;/g, 'right: calc(5vw + 40vw) !important;');
      content = content.replace(/left:\s*calc\(5vw \+ 14vw \+ [0-9]+vw\)\s*!important;/g, 'right: calc(5vw + 40vw) !important;');
  }

  // Also catch any missed `left: calc(...)` inside `.music-btn` blocks
  // Since we know exactly what they were replaced with, the regex above should be perfectly safe.

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Restored music button to right in:', file);
      count++;
  }
});

console.log(`Updated ${count} files.`);
