const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, 'unchecked');
const destDir = path.resolve(__dirname, '.vitepress/dist/unchecked');

function copyPDFsRecursively(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.readdirSync(srcDir, { withFileTypes: true }).forEach(entry => {
    const sourcePath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // サブディレクトリの場合は再帰的に処理
      copyPDFsRecursively(sourcePath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.pdf')) {
      // PDF ファイルの場合はコピー
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  });
}

copyPDFsRecursively(sourceDir, destDir);
