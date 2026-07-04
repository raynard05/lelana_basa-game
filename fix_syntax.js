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

  // Fix syntax errors like `right: calc(5vw + 12vh + 2vw) + 2vw);`
  content = content.replace(/right:\s*calc\([^)]+\)\s*\+\s*[0-9]+vw\s*\);/g, 'right: calc(5vw + 12vh + 2vw);');
  
  // Just in case we messed up mobile
  content = content.replace(/right:\s*calc\([^)]+\)\s*\+\s*[0-9]+vw\s*\)\s*!important;/g, 'right: calc(5vw + 14vw + 2vw) !important;');

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed syntax in:', file);
      count++;
  }
});

console.log(`Fixed ${count} files.`);
