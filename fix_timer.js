const fs = require('fs');
const files = [
  'app/babak1/page1/page.tsx',
  'app/babak2/page1/page.tsx',
  'app/babak4/page1/page.tsx',
  'app/babak5/page1/page.tsx',
  'app/babak7/page1/page.tsx',
  'app/babak7/page6/page.tsx',
  'app/babak9/page1/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/initialTime=\{150\}/g, 'initialTime={120}');
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Updated ' + f);
  }
});
