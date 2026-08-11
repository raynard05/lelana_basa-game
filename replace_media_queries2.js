const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'app'), (filePath) => {
  if (filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const target1 = '@media (max-width: 900px) and (max-height: 500px)';
    const target2 = '@media (max-width:900px) and (max-height:500px)';
    
    let updated = false;
    if (content.includes(target1)) {
      content = content.split(target1).join('@media (max-height: 720px) and (orientation: landscape)');
      updated = true;
    }
    if (content.includes(target2)) {
      content = content.split(target2).join('@media (max-height: 720px) and (orientation: landscape)');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Updated media query in:', filePath);
    }
  }
});
