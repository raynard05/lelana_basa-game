const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
let modifiedCount = 0;

for (let i = 1; i <= 7; i++) {
  const babakDir = path.join(appDir, 'babak' + i);
  if (fs.existsSync(babakDir)) {
    const pages = fs.readdirSync(babakDir);
    for (const page of pages) {
      const pageDir = path.join(babakDir, page);
      if (fs.statSync(pageDir).isDirectory()) {
        const files = fs.readdirSync(pageDir);
        for (const file of files) {
          if (file.endsWith('.css')) {
            const filePath = path.join(pageDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Check if already has zoom for laptops
            if (content.includes('@media (max-width: 1440px)') && content.includes('zoom: 0.9;')) {
              console.log(`Skipping (already has zoom): ${filePath}`);
              continue;
            }
            
            // Find container class
            const match = content.match(/\.([a-zA-Z0-9_-]+container)\s*\{/);
            if (match) {
              const containerClass = match[1];
              const cssToAppend = `\n
/* Responsive Zoom for laptops */
@media (max-width: 1440px) {
  .${containerClass} {
    zoom: 0.9;
  }
}

@media (max-width: 1280px) {
  .${containerClass} {
    zoom: 0.8;
  }
}

@media (max-width: 1024px) {
  .${containerClass} {
    zoom: 0.7;
  }
}
`;
              fs.appendFileSync(filePath, cssToAppend);
              console.log(`Updated: ${filePath} with class .${containerClass}`);
              modifiedCount++;
            } else {
              console.log(`Warning: No container class found in ${filePath}`);
            }
          }
        }
      }
    }
  }
}

console.log(`Total files updated: ${modifiedCount}`);
