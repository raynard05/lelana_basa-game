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

  // We want to find any music button CSS block and change `right:` to `left:` if it's using the calc offset
  // A regex to match: \.([a-zA-Z0-9\-]+)?music([a-zA-Z0-9\-]+)?-btn { ... right: calc(...) ... }
  // Since we already standardized the spacing to `calc(...)` we can just globally replace `right: calc(5vw + clamp...` with `left:` in music buttons.
  
  // A safer way is to split the CSS by blocks, find ones containing music-btn, and replace `right: ` with `left: ` inside them.
  
  const blocks = content.split('}');
  for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].includes('music') && blocks[i].includes('-btn') && blocks[i].includes('right: calc')) {
          blocks[i] = blocks[i].replace(/right:\s*(calc[^;]+;)/g, 'left: $1');
      }
  }
  content = blocks.join('}');

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Moved music button to left in:', file);
      count++;
  }
});

console.log(`Updated ${count} files.`);
