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
    let updated = false;
    
    // Replace max-width: 800px; with max-width: 1100px; 
    // (This is primarily used for the audio container so it can be wider on fullscreen)
    if (content.includes('max-width: 800px;')) {
      content = content.replace(/max-width:\s*800px;/g, 'max-width: 1100px;');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Updated max-width in:', filePath);
    }
  }
});
