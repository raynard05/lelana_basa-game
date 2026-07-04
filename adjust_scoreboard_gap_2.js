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

  // Reduce offset to push button more to the right (closer to scoreboard)
  content = content.replace(/right:\s*calc\(5vw \+ 180px\);/g, 'right: calc(5vw + 150px);');
  
  // Portrait reduce offset
  content = content.replace(/right:\s*calc\(5vw \+ 35vw\)\s*!important;/g, 'right: calc(5vw + 30vw) !important;');

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Adjusted gap closer to scoreboard in:', file);
      count++;
  }
});

console.log(`Updated ${count} files.`);
