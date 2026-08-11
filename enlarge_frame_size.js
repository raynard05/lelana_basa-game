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
    // width: 78vw;
    // height: 73vh;
    // max-width: 157vh;
    // max-height: 73vh;
    // with 5% larger (90% of original instead of 85%):
    // width: 83vw;
    // height: 77vh;
    // max-width: 166vh;
    // max-height: 77vh;
    
    content = content.replace(/width:\s*78vw;/g, 'width: 83vw;');
    content = content.replace(/height:\s*73vh;/g, 'height: 77vh;');
    content = content.replace(/max-width:\s*157vh;/g, 'max-width: 166vh;');
    content = content.replace(/max-height:\s*73vh;/g, 'max-height: 77vh;');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
