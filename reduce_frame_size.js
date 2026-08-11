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
    
    // We are replacing the current size:
    // width: 92vw;
    // height: 86vh;
    // max-width: 185vh;
    // max-height: 86vh;
    // with 15% smaller:
    // width: 78vw;
    // height: 73vh;
    // max-width: 157vh;
    // max-height: 73vh;
    
    content = content.replace(/width:\s*92vw;/g, 'width: 78vw;');
    content = content.replace(/height:\s*86vh;/g, 'height: 73vh;');
    content = content.replace(/max-width:\s*185vh;/g, 'max-width: 157vh;');
    content = content.replace(/max-height:\s*86vh;/g, 'max-height: 73vh;');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
