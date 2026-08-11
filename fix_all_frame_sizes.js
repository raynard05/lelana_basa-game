const fs = require('fs');
const path = require('path');

const targets = [
  'app/babak1/page2_narration/page2.css',
  'app/babak2/page2_narration/page2.css',
  'app/babak3/page1_narration/page1_narration.css',
  'app/babak4/page2_narration/page2.css',
  'app/babak5/page2_narration/page2.css',
  'app/babak6/page1_narration/page1_narration.css',
  'app/babak7/page2_narration/page2.css',
  'app/babak8/page1_narration/babak8.css',
  'app/babak9/page2_narration/page2.css',
];

targets.forEach(target => {
  const filePath = path.join(__dirname, target);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the old static sizes with the new responsive sizes
    content = content.replace(/width:\s*80vw;/g, 'width: 85vw;');
    content = content.replace(/height:\s*75vh;/g, 'height: 80vh;');
    content = content.replace(/max-width:\s*1100px;/g, 'max-width: 171vh;');
    content = content.replace(/max-height:\s*500px;/g, 'max-height: 80vh;');

    fs.writeFileSync(filePath, content);
    console.log('Fixed sizes in:', target);
  } else {
    console.log('File not found:', target);
  }
});
