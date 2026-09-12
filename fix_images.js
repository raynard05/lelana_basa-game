const fs = require('fs');
const path = require('path');

const replacements = [
    {
        file: 'app/babak2/page1/page.tsx',
        oldSrc: '/babak2/pages_1_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak2.webp'
    },
    {
        file: 'app/babak4/page1/page.tsx',
        oldSrc: '/babak4/pages_1_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak4.png'
    },
    {
        file: 'app/babak5/page1/page.tsx',
        oldSrc: '/babak5/pages_1_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak5.webp'
    },
    {
        file: 'app/babak7/page1/page.tsx',
        oldSrc: '/babak7/pages_1_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak7_page1.webp'
    },
    {
        file: 'app/babak7/page6/page.tsx',
        oldSrc: '/babak7/pages_6_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak7_page6.webp'
    },
    {
        file: 'app/babak9/page1/page.tsx',
        oldSrc: '/babak9/pages_1_assets/aktor_npc.png',
        newSrc: '/all_characters/character_babak9_page1.webp'
    }
];

replacements.forEach(r => {
    if (fs.existsSync(r.file)) {
        let content = fs.readFileSync(r.file, 'utf-8');
        content = content.replace(`src="${r.oldSrc}"`, `src="${r.newSrc}"`);
        fs.writeFileSync(r.file, content, 'utf-8');
        console.log(`Updated image in ${r.file}`);
    } else {
        console.log(`Not found: ${r.file}`);
    }
});
