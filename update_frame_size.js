const fs = require('fs');
const path = require('path');

const targets = [
  'app/babak3/page1_narration/page1_narration.css',
  'app/babak6/page1_narration/page1_narration.css',
  'app/babak8/page1_narration/page1_narration.css',
];

targets.forEach(target => {
  const filePath = path.join(__dirname, target);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to target .card-frame-page2 or .card-frame-page1
    content = content.replace(/(\.card-frame-page[12]\s*\{)([\s\S]*?)(\})/g, (match, p1, p2, p3) => {
      let updatedBody = p2
        .replace(/\bwidth:\s*[^;]+;/g, 'width: 92vw;')
        .replace(/\bheight:\s*[^;]+;/g, 'height: 86vh;')
        .replace(/\bmax-width:\s*[^;]+;/g, 'max-width: 185vh;')
        .replace(/\bmax-height:\s*[^;]+;/g, 'max-height: 86vh;');
      return p1 + updatedBody + p3;
    });

    fs.writeFileSync(filePath, content);
    console.log('Updated:', target);
  } else {
    console.log('File not found:', target);
  }
});
