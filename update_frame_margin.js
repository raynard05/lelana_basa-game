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
    
    // We are looking for the .card-frame block, which has margin-top: 7%;
    // We will change it to margin-top: 2%;
    content = content.replace(/margin-top:\s*7%;/g, 'margin-top: 2%;');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
