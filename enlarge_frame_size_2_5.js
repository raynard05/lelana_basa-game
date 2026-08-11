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
    
    // We are replacing the current size (90%):
    // width: 83vw;
    // height: 77vh;
    // max-width: 166vh;
    // max-height: 77vh;
    // with 2.5% larger (92.5% of original):
    // width: 85vw;
    // height: 80vh;
    // max-width: 171vh;
    // max-height: 80vh;
    
    content = content.replace(/width:\s*83vw;/g, 'width: 85vw;');
    content = content.replace(/height:\s*77vh;/g, 'height: 80vh;');
    content = content.replace(/max-width:\s*166vh;/g, 'max-width: 171vh;');
    content = content.replace(/max-height:\s*77vh;/g, 'max-height: 80vh;');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
