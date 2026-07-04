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
  
  const navBtnClass = prefix ? '.' + prefix + '-nav-btn' : '.nav-btn';
  
  content = content.replace(/right:\s*calc\(5vw \+ [0-9]+px \+ 2vw\);/g, 'right: calc(5vw + max(45px, 8vh) + 2vw);');
  content = content.replace(/right:\s*calc\(4vw \+ [0-9]+vw \+ 3vw\);/g, 'right: calc(4vw + 12vw + 3vw) !important;');

  let match = content.match(/@media\s*\(orientation:\s*portrait\)\s*\{/);
  if (match) {
    let index = match.index + match[0].length;
    let injection = '\n  ' + navBtnClass + ' {\n    width: 12vw !important;\n    height: 12vw !important;\n    min-width: unset !important;\n    min-height: unset !important;\n    max-width: unset !important;\n    max-height: unset !important;\n  }\n';
    
    if (!content.includes('width: 12vw !important;')) {
        content = content.substring(0, index) + injection + content.substring(index);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed:', file);
});
