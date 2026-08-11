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
    
    // Main frame: margin-top: 2% -> margin-top: 4.8%
    content = content.replace(/margin-top:\s*2%;/g, 'margin-top: 4.8%;');
    
    // Sinopsis (audio container): bottom: 5vh -> bottom: 0vh; (since 5% lower from 5vh is 0)
    // We will use 0vh to push it 5 units down as requested.
    content = content.replace(/bottom:\s*5vh;/g, 'bottom: 0vh;');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
