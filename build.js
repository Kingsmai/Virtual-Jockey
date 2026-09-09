import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

// 清理并重新创建 dist 目录
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 需要复制的静态文件和目录
const filesToCopy = ['index.html', 'screen.html', 'icon.svg'];
const dirsToCopy = ['plugins'];

for (const file of filesToCopy) {
  const src = path.join(process.cwd(), file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

for (const dir of dirsToCopy) {
  const src = path.join(process.cwd(), dir);
  const dest = path.join(distDir, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}

console.log('✅ Web assets bundled into dist/ successfully.');
