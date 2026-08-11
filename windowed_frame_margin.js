const fs = require('fs');
const path = require('path');

const targets = [
  'app/babak1/page2_narration/page2.css',
  'app/babak4/page2_narration/page2.css',
  'app/babak5/page2_narration/page2.css',
  'app/babak7/page2_narration/page2.css',
  'app/babak9/page2_narration/page2.css',
  'app/babak3/page1_narration/page1_narration.css',
  'app/babak6/page1_narration/page1_narration.css',
  'app/babak8/page1_narration/babak8.css',
];

targets.forEach(target => {
  const filePath = path.join(__dirname, target);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the main card frame class name by looking for margin-top: 4.8%
    const match = content.match(/(\.[a-zA-Z0-9_-]+)\s*\{[^}]*margin-top:\s*4\.8%;/);
    if (match) {
      const className = match[1];
      
      // Check if media query already exists to prevent duplicates
      if (!content.includes('@media (max-height: 679px)')) {
        const mq = `\n\n/* Windowed mode override */\n@media (max-height: 679px) {\n  ${className} {\n    margin-top: 2.8%;\n  }\n}\n`;
        content += mq;
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${target} with class ${className}`);
      } else {
        console.log(`Media query already exists in ${target}`);
      }
    } else {
      console.log(`Could not find margin-top: 4.8% class in ${target}`);
    }
  } else {
    console.log('File not found:', target);
  }
});
