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

for (const relFile of files) {
  const file = "d:/lelana basa/lelana_basa-game/" + relFile;
  if (!fs.existsSync(file)) {
    console.log("File not found:", file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  const recordRegex = /(?:\{\/\*[\s\S]*?\*\/\}\s*)?<RecordButton[\s\S]*?\/>/;
  const listenRegex = /(?:\{\/\*[\s\S]*?\*\/\}\s*)?<ListenButton[\s\S]*?\/>/;
  
  const recordMatch = content.match(recordRegex);
  const listenMatch = content.match(listenRegex);
  
  if (recordMatch && listenMatch) {
    const recordBlock = recordMatch[0];
    const listenBlock = listenMatch[0];
    
    const recordIndex = content.indexOf(recordBlock);
    const listenIndex = content.indexOf(listenBlock);
    
    if (recordIndex < listenIndex) {
      let newContent = content;
      newContent = newContent.replace(recordBlock, '___PLACEHOLDER_LISTEN___');
      newContent = newContent.replace(listenBlock, '___PLACEHOLDER_RECORD___');
      
      newContent = newContent.replace('___PLACEHOLDER_LISTEN___', listenBlock);
      newContent = newContent.replace('___PLACEHOLDER_RECORD___', recordBlock);
      
      fs.writeFileSync(file, newContent);
      console.log('Swapped in', relFile);
    } else {
      console.log('Already in order in', relFile);
    }
  } else {
    console.log('Could not find both blocks in', relFile);
  }
}
