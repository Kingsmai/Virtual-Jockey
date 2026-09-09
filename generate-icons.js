import fs from 'fs';
import path from 'path';

// 生成一个炫酷的 VJ 控制台 SVG 图标
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08090d"/>
      <stop offset="100%" stop-color="#141926"/>
    </linearGradient>
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#0088ff"/>
    </linearGradient>
    <linearGradient id="neonPink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff007f"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- 背景底板 -->
  <rect width="512" height="512" rx="110" fill="url(#bg)" stroke="#222d42" stroke-width="8"/>

  <!-- 发光外环 -->
  <circle cx="256" cy="256" r="180" fill="none" stroke="url(#neonPink)" stroke-width="6" opacity="0.4" stroke-dasharray="16 12"/>
  
  <!-- 核心波形与频闪几何 -->
  <polygon points="256,90 390,360 122,360" fill="none" stroke="url(#neonCyan)" stroke-width="14" stroke-linejoin="round" filter="url(#glow)"/>
  <polygon points="256,170 340,340 172,340" fill="rgba(0, 240, 255, 0.15)" stroke="url(#neonPink)" stroke-width="8" stroke-linejoin="round"/>
  
  <!-- 中心发光棱镜脉冲 -->
  <circle cx="256" cy="285" r="28" fill="#ffffff" filter="url(#glow)"/>
  <circle cx="256" cy="285" r="42" fill="none" stroke="#00f0ff" stroke-width="6" opacity="0.8"/>

  <!-- VJ 字母装饰 -->
  <text x="256" y="440" font-family="-apple-system, sans-serif" font-weight="900" font-size="44" fill="#00f0ff" text-anchor="middle" letter-spacing="8" filter="url(#glow)">VJ STROBE</text>
</svg>`;

const iconDir = path.join(process.cwd(), 'src-tauri', 'icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

fs.writeFileSync(path.join(iconDir, 'icon.svg'), svgIcon);
fs.writeFileSync(path.join(process.cwd(), 'icon.svg'), svgIcon);
console.log('✅ Icons generated successfully!');
