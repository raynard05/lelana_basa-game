const fs = require('fs');
const path = require('path');

const targets = [
  'app/babak1/page2_narration/page2.css',
  'app/babak2/page2_narration/page2.css',
];

targets.forEach(target => {
  const filePath = path.join(__dirname, target);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 3% with 1.2%
    content = content.replace(/margin-top:\s*3%\s*!important;/g, 'margin-top: 1.2% !important;');
    
    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
