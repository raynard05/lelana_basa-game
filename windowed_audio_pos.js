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
    
    // Find the audio container class
    const audioMatch = content.match(/(\.[a-zA-Z0-9_-]*audio-container[a-zA-Z0-9_-]*)\s*\{/);
    if (audioMatch) {
      const audioClass = audioMatch[1];
      
      // Inject the audio class rule into the existing windowed media query
      const mqRegex = /(@media\s*\(max-height:\s*679px\)\s*\{[\s\S]*?)(\n\})/;
      if (mqRegex.test(content)) {
        content = content.replace(mqRegex, `$1\n  ${audioClass} {\n    bottom: 2.5vh;\n  }$2`);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${target} with audio class ${audioClass}`);
      } else {
        console.log(`Could not find windowed media query in ${target}`);
      }
    } else {
      console.log(`Could not find audio container class in ${target}`);
    }
  } else {
    console.log('File not found:', target);
  }
});
