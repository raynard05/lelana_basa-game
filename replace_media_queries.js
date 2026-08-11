const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, search, replacement) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(search) || new RegExp(search).test(content)) {
      content = content.replace(new RegExp(search, 'g'), replacement);
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
    }
  }
}

// Update Sinopsis.tsx
replaceInFile(
  path.join(__dirname, 'components/Sinopsis.tsx'),
  '@media \\(max-width: 900px\\)',
  '@media (max-height: 720px) and (orientation: landscape)'
);

// Update AnimatedNarration.css
replaceInFile(
  path.join(__dirname, 'components/AnimatedNarration.css'),
  '@media \\(max-width: 900px\\) and \\(max-height: 500px\\)',
  '@media (max-height: 720px) and (orientation: landscape)'
);

// Update all babak css files that might have the old query
const glob = require('glob');
glob('app/**/*.css', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for standard spacing
    const target1 = '@media (max-width: 900px) and (max-height: 500px)';
    const target2 = '@media (max-width:900px) and (max-height:500px)';
    
    let updated = false;
    if (content.includes(target1)) {
      content = content.replace(new RegExp(target1.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), '@media (max-height: 720px) and (orientation: landscape)');
      updated = true;
    }
    if (content.includes(target2)) {
      content = content.replace(new RegExp(target2.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), '@media (max-height: 720px) and (orientation: landscape)');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(fullPath, content);
      console.log('Updated media query in:', file);
    }
  });
});
