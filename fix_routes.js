const fs = require('fs');
const updates = [
  { file: 'app/babak2/page1/page.tsx', old: '/babak2/page2', new: '/babak2/page2_narration' },
  { file: 'app/babak4/page1/page.tsx', old: '/babak4/page2', new: '/babak4/page2_narration' },
  { file: 'app/babak5/page1/page.tsx', old: '/babak5/page2', new: '/babak5/page2_narration' },
  { file: 'app/babak7/page1/page.tsx', old: '/babak7/page2', new: '/babak7/page2_narration' },
  { file: 'app/babak9/page1/page.tsx', old: '/babak9/page2', new: '/babak9/page2_narration' },
  { file: 'app/babak7/page6/page.tsx', old: '/babak7/page7', new: '/babak7/page8' }
];

updates.forEach(u => {
  if(fs.existsSync(u.file)) {
    let content = fs.readFileSync(u.file, 'utf-8');
    content = content.replace(`router.push('${u.old}')`, `router.push('${u.new}')`);
    fs.writeFileSync(u.file, content, 'utf-8');
    console.log('Updated ' + u.file);
  }
});
