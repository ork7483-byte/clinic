const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const files = execSync('dir /s /b "C:\\Users\\pc\\Desktop\\site-analyzer\\kimskinclinic.co.kr\\*.html"', { encoding: "utf8" }).trim().split("\r\n");

const blockToRemove = `
  // 3. Next.js 링크 클릭 시 일반 페이지 이동으로 강제 전환
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    try {
      var u = new URL(link.href);
      if (u.origin === window.location.origin) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.href = link.href;
      }
    } catch(err) {}
  }, true);`;

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("// 3. Next.js 링크 클릭 시")) {
    content = content.replace(blockToRemove, "");
    fs.writeFileSync(file, content, "utf8");
    console.log("Fixed: " + path.relative("C:\\Users\\pc\\Desktop\\site-analyzer\\kimskinclinic.co.kr", file));
    count++;
  }
}
console.log("\nTotal: " + count + " files fixed");
