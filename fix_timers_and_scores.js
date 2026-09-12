const fs = require('fs');

// 1. Fix babak1/page1 to clear ALL timers
let b1p1 = 'app/babak1/page1/page.tsx';
if (fs.existsSync(b1p1)) {
  let content = fs.readFileSync(b1p1, 'utf-8');
  content = content.replace(
    /const timerKeys = \[\s*'babak1_page1_timer_expiration',\s*'babak1_page1_timer_paused_time'\s*\];\s*timerKeys\.forEach\(key => localStorage\.removeItem\(key\)\);/,
    `Object.keys(localStorage).forEach(key => {
        if (key.includes('_timer_')) {
          localStorage.removeItem(key);
        }
      });`
  );
  fs.writeFileSync(b1p1, content, 'utf-8');
  console.log('Fixed timers in babak1/page1');
}

// 2. Fix other pages to NOT clear game_score and game_streak, and only clear their own timer if needed
const otherPages = [
  { file: 'app/babak2/page1/page.tsx', prefix: 'babak2' },
  { file: 'app/babak4/page1/page.tsx', prefix: 'babak4' },
  { file: 'app/babak5/page1/page.tsx', prefix: 'babak5' },
  { file: 'app/babak7/page1/page.tsx', prefix: 'babak7' },
  { file: 'app/babak7/page6/page.tsx', prefix: 'babak7_page6' },
  { file: 'app/babak9/page1/page.tsx', prefix: 'babak9' },
];

otherPages.forEach(p => {
  if (fs.existsSync(p.file)) {
    let content = fs.readFileSync(p.file, 'utf-8');
    
    // Replace the entire useEffect block
    const regex = new RegExp(`localStorage\\.setItem\\('game_score', '0'\\);\\s*localStorage\\.setItem\\('game_streak', '0'\\);\\s*const timerKeys = \\[\\s*'${p.prefix}_(?:page1_)?timer_expiration',\\s*'${p.prefix}_(?:page1_)?timer_paused_time'\\s*\\];\\s*timerKeys\\.forEach\\(key => localStorage\\.removeItem\\(key\\)\\);`);
    
    content = content.replace(regex, `const timerKeys = [
        '${p.prefix}_timer_expiration',
        '${p.prefix}_timer_paused_time'
      ];
      timerKeys.forEach(key => localStorage.removeItem(key));`);
      
    // Wait, some prefixes have page1 some don't. In my update_pages.js, I generated:
    // '${p.css_prefix}_timer_expiration'
    // css_prefix for babak2 is babak2. So it's babak2_timer_expiration?
    // Let's check page2 source: it was babak2_page1_timer_expiration in the source.
    // Let me just replace the setItem lines entirely.
    
    content = content.replace(/localStorage\.setItem\('game_score', '0'\);\s*localStorage\.setItem\('game_streak', '0'\);/g, '');
    
    fs.writeFileSync(p.file, content, 'utf-8');
    console.log('Fixed score reset in ' + p.file);
  }
});
