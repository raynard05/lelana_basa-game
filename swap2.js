const fs = require('fs');

const files = [
  "app/babak9/page3/page.tsx",
  "app/babak7/page9/page.tsx",
  "app/babak7/page8/page.tsx",
  "app/babak7/page7/page.tsx",
  "app/babak7/page5/page.tsx",
  "app/babak7/page4/page.tsx",
  "app/babak7/page3/page.tsx",
  "app/babak5/page3/page.tsx",
  "app/babak5/page5/page.tsx",
  "app/babak5/page4/page.tsx",
  "app/babak4/page4/page.tsx",
  "app/babak4/page3/page.tsx",
  "app/babak2/page3/page.tsx",
  "app/babak2/page4/page.tsx",
  "app/babak1/page4/page.tsx",
  "app/babak1/page5/page.tsx",
  "app/babak1/page3/page.tsx"
];

function extractBlock(tag, text) {
  const idx = text.indexOf('<' + tag);
  if (idx === -1) return null;
  
  let startIdx = idx;
  let lookBehind = text.lastIndexOf('{/* ', idx);
  // check if the comment is right before the tag (ignoring whitespace)
  if (lookBehind !== -1) {
      let between = text.substring(lookBehind, idx);
      if (between.trim().endsWith('*/}')) {
          startIdx = lookBehind;
      }
  }
  
  const endIdx = text.indexOf('/>', idx);
  if (endIdx === -1) return null;
  
  return {
     str: text.substring(startIdx, endIdx + 2),
     start: startIdx,
     end: endIdx + 2
  };
}

for (const relFile of files) {
  const file = "d:/lelana basa/lelana_basa-game/" + relFile;
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  const rec = extractBlock('RecordButton', content);
  const lis = extractBlock('ListenButton', content);

  if (rec && lis) {
     if (rec.start < lis.start) {
        let newContent = content.substring(0, rec.start) + 
                         lis.str + 
                         content.substring(rec.end, lis.start) + 
                         rec.str + 
                         content.substring(lis.end);
        fs.writeFileSync(file, newContent);
        console.log('Swapped (Record was first) in', relFile);
     } else {
        console.log('Already in order (Listen is first) in', relFile);
     }
  } else {
     console.log('Could not parse blocks in', relFile);
  }
}
