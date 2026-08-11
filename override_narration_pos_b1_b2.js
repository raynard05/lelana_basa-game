const fs = require('fs');
const path = require('path');

const targets = [
  'app/babak1/page2_narration/page2.css',
  'app/babak2/page2_narration/page2.css',
];

const override = `\n\n/* Override Animated Narration position specifically for this Babak */\n.animated-narration-wrapper {\n  margin-top: 3% !important;\n}\n`;

targets.forEach(target => {
  const filePath = path.join(__dirname, target);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only append if it doesn't already exist
    if (!content.includes('margin-top: 3% !important;')) {
      content += override;
      fs.writeFileSync(filePath, content);
      console.log('Updated:', target);
    } else {
      console.log('Already updated:', target);
    }
  } else {
    console.log('File not found:', target);
  }
});
