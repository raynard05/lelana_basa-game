const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      getFiles(file, files);
    } else if (file.endsWith('.css') && file.includes('narration')) {
      files.push(file);
    }
  }
  return files;
}

const files = getFiles('app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let prefixMatch = content.match(/\.([a-zA-Z0-9\-]+)-home-btn/);
  let prefix = '';
  if (prefixMatch) {
    prefix = prefixMatch[1];
  } else if (content.includes('.home-btn')) {
    prefix = '';
  } else {
    return;
  }
  
  if (prefix === '') return; // babak1 already has it
  
  const navBtnClass = '.' + prefix + '-nav-btn';
  
  if (!content.includes(navBtnClass + ' {') && !content.includes(navBtnClass + '{')) {
      const injection = `
${navBtnClass} {
  position: absolute;
  z-index: 100;
  width: 15vh;
  height: 15vh;
  min-width: 50px;
  min-height: 50px;
  max-width: 80px;
  max-height: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease;
  touch-action: manipulation;
}

@media (hover: hover) and (pointer: fine) {
  ${navBtnClass}:hover {
    transform: scale(1.15);
  }
}

${navBtnClass}:active {
  opacity: 0.7;
}
`;
      
      if (content.includes('/* Nav Controls */')) {
          content = content.replace('/* Nav Controls */', '/* Nav Controls */' + injection);
      } else {
          content = injection + content;
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log('Injected base nav-btn for:', file);
  }
});
