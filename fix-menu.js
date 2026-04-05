const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname);

function getAllHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('assets')) {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(DIR);
let totalFixed = 0;

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Replace href="#slide-out-widget-area" with javascript:void(0) to prevent URL dialog on mobile
  const fixed = content.replace(/href="#slide-out-widget-area"/g, 'href="javascript:void(0)"');
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    const count = (content.match(/href="#slide-out-widget-area"/g) || []).length;
    console.log(`Fixed: ${path.relative(DIR, filePath)} (${count} replacements)`);
    totalFixed += count;
  }
}

console.log(`\nTotal replacements: ${totalFixed}`);
