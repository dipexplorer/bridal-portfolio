const fs = require('fs');
const path = require('path');

const replacements = [
  { from: 'bg-[#0a0a0a]', to: 'bg-charcoal' },
  { from: 'from-[#0a0a0a]', to: 'from-charcoal' },
  { from: 'via-[#0a0a0a]', to: 'via-charcoal' },
  { from: 'to-[#0a0a0a]', to: 'to-charcoal' },
  { from: 'border-white/[0.05]', to: 'border-white/5' },
  { from: 'bg-[#E52E2D]/[0.02]', to: 'bg-[#E52E2D]/2' },
  { from: 'bg-white/[0.01]', to: 'bg-white/1' },
  { from: 'bg-white/[0.06]', to: 'bg-white/6' },
  { from: 'aspect-[3/4]', to: 'aspect-3/4' },
  { from: 'aspect-[4/5]', to: 'aspect-4/5' },
  { from: 'bg-gradient-to-t', to: 'bg-linear-to-t' },
  { from: 'bg-gradient-to-b', to: 'bg-linear-to-b' },
  { from: 'bg-gradient-to-l', to: 'bg-linear-to-l' },
  { from: 'bg-gradient-to-r', to: 'bg-linear-to-r' },
  { from: 'text-white/[0.06]', to: 'text-white/6' },
  { from: 'z-[99999]', to: 'z-99999' },
  { from: 'border-white/[0.06]', to: 'border-white/6' },
  { from: 'h-[100svh]', to: 'h-svh' },
  { from: 'min-h-[100svh]', to: 'min-h-svh' },
  { from: 'h-[1px]', to: 'h-px' },
  { from: 'w-[1px]', to: 'w-px' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const r of replacements) {
        // Use global regex replace to catch all occurrences
        const regex = new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        if (regex.test(content)) {
          content = content.replace(regex, r.to);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('/mnt/data2/SIDE_HUSSLE/projects/bridal-portfolio/src');
console.log('All warnings fixed!');
