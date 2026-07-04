const fs = require('fs');

const createCss = (className) => `
.${className}-wrapper {
  position: absolute;
  z-index: 100;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  width: 12vh;
  height: 12vh;
  min-width: 50px;
  min-height: 50px;
  max-width: 80px;
  max-height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
  touch-action: manipulation;
}

@media (hover: hover) and (pointer: fine) {
  .${className}-wrapper:hover {
    filter: brightness(1.1);
    transform: scale(1.15);
  }
}

.${className}-wrapper:active {
  opacity: 0.7;
  transform: scale(0.95);
}

/* Mobile adjustments */
@media (orientation: portrait) {
  .${className}-wrapper {
    width: 14vw;
    height: 14vw;
    min-width: unset;
    min-height: unset;
    max-width: unset;
    max-height: unset;
  }
}
`;

fs.writeFileSync('components/Home.css', createCss('home-btn'));
fs.writeFileSync('components/Music.css', createCss('music-btn'));
fs.writeFileSync('components/Skip.css', createCss('skip-btn'));

// Also update menu.css to have exactly this for info-btn and logout-btn
let menuCss = fs.readFileSync('app/menu/menu.css', 'utf8');

// Remove existing width/height/transform for info-btn and logout-btn
menuCss = menuCss.replace(/\.info-btn,\s*\.logout-btn\s*\{[^}]+\}/g, `.info-btn,
.logout-btn {
  position: absolute;
  z-index: 100;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  width: 12vh;
  height: 12vh;
  min-width: 50px;
  min-height: 50px;
  max-width: 80px;
  max-height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
  touch-action: manipulation;
}`);

// Ensure portrait override in menu.css uses 14vw
menuCss = menuCss.replace(/\.info-btn,\s*\.sound-btn,\s*\.logout-btn\s*\{\s*width:[^}]+\}/g, `.info-btn,
  .sound-btn,
  .logout-btn {
    width: 14vw;
    height: 14vw;
    min-width: unset;
    min-height: unset;
    max-width: unset;
    max-height: unset;
  }`);

fs.writeFileSync('app/menu/menu.css', menuCss);
console.log('Centralized CSS applied successfully.');
