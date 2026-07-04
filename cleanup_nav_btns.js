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

  // 1. Remove the injected base nav-btn blocks entirely
  // It looks like: .prefix-nav-btn { position: absolute; ... } @media ... { ... } .prefix:active ...
  const regexBase = /\.[a-zA-Z0-9\-]+-nav-btn\s*\{\s*position:\s*absolute;[\s\S]*?touch-action:\s*manipulation;\s*\}\s*@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*\{[\s\S]*?\}\s*\.[a-zA-Z0-9\-]+-nav-btn:active\s*\{\s*opacity:\s*0\.7;\s*\}/g;
  content = content.replace(regexBase, '');
  
  // also for generic .nav-btn
  const regexBaseGeneric = /\.nav-btn\s*\{\s*position:\s*absolute;[\s\S]*?touch-action:\s*manipulation;\s*\}\s*@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*\{[\s\S]*?\}\s*\.nav-btn:active\s*\{\s*opacity:\s*0\.7;\s*\}/g;
  content = content.replace(regexBaseGeneric, '');

  // 2. Remove the injected portrait size overrides for nav-btn
  // It looks like: .prefix-nav-btn { width: 12vw !important; ... }
  const regexPortrait = /\.[a-zA-Z0-9\-]+-nav-btn\s*\{\s*width:\s*12vw\s*!important;[\s\S]*?max-height:\s*unset\s*!important;\s*\}/g;
  content = content.replace(regexPortrait, '');

  // also for generic .nav-btn portrait
  const regexPortraitGeneric = /\.nav-btn\s*\{\s*width:\s*12vw\s*!important;[\s\S]*?max-height:\s*unset\s*!important;\s*\}/g;
  content = content.replace(regexPortraitGeneric, '');

  // 3. Remove .nav-btn from babak1/page1.css if it exists
  const regexBabak1 = /\.nav-btn\s*\{[^}]*width:\s*15vh;[^}]*\}/g;
  content = content.replace(regexBabak1, '');
  
  // Also remove active states if left hanging
  content = content.replace(/\.[a-zA-Z0-9\-]+-nav-btn:active\s*\{\s*opacity:\s*0\.7;\s*\}/g, '');
  content = content.replace(/\.nav-btn:active\s*\{\s*opacity:\s*0\.7;\s*\}/g, '');

  if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Cleaned up nav-btn rules in:', file);
  }
});
