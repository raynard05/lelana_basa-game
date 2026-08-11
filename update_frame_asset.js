const fs = require('fs');
const path = require('path');

const targets = [
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
    
    // Replace /frame_babak/X.webp with /frame_babak/X_u.webp
    // Ensure we don't accidentally replace already updated ones
    content = content.replace(/\/frame_babak\/([3-9])\.webp/g, '/frame_babak/$1_u.webp');

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
