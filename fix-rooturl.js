const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const files = execSync('dir /s /b "C:\\Users\\pc\\Desktop\\site-analyzer\\kimskinclinic.co.kr\\*.html"', { encoding: "utf8" }).trim().split("\r\n");

let totalCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;

  // Restore protocol-relative image URLs back to proxy
  content = content.replaceAll('src="./wp-content/', 'src="//www.kimskinclinic.co.kr/wp-content/');
  content = content.replaceAll("src='./wp-content/", "src='//www.kimskinclinic.co.kr/wp-content/");
  content = content.replaceAll('srcset="./wp-content/', 'srcset="//www.kimskinclinic.co.kr/wp-content/');
  content = content.replaceAll('data-thumb="./wp-content/', 'data-thumb="//www.kimskinclinic.co.kr/wp-content/');
  content = content.replaceAll('content="./wp-content/', 'content="//www.kimskinclinic.co.kr/wp-content/');
  // Also fix cases where srcset has multiple entries with commas
  content = content.replace(/,\s*\.\/wp-content\//g, ', //www.kimskinclinic.co.kr/wp-content/');

  if (content !== before) {
    fs.writeFileSync(file, content, "utf8");
    const rel = path.relative("C:\\Users\\pc\\Desktop\\site-analyzer\\kimskinclinic.co.kr", file);
    const count = (before.match(/https:\\\/\\\/www\.kimskinclinic\.co\.kr/g) || []).length;
    console.log(`Fixed: ${rel} (${count} replacements)`);
    totalCount += count;
  }
}
console.log(`\nTotal: ${totalCount} replacements in ${files.length} files`);
