import fs from 'fs';
import path from 'path';

const PLUGINS_DIR = path.resolve(process.cwd(), 'plugins');
if (!fs.existsSync(PLUGINS_DIR)) {
  fs.mkdirSync(PLUGINS_DIR, { recursive: true });
}

// Write utils.js
const utilsContent = `/**
 * Shared Plugin Utilities for VJ Engine
 */

export function getStyleColor(baseHex, alpha = 1, shiftOffset = 0, time = 0, globalVariant = 0) {
  if (globalVariant === 1) {
    // Hyper Laser (Pure White / Intense Cyan-white)
    return \`rgba(255, 255, 255, \${alpha})\`;
  }
  if (globalVariant === 2) {
    // Acid Rainbow (Dynamic HSV cycling)
    const hue = (time * 80 + shiftOffset) % 360;
    return \`hsla(\${hue}, 100%, 60%, \${alpha})\`;
  }
  if (globalVariant === 3) {
    // Glitch Noir (Monochrome Invert Tint)
    return \`rgba(240, 245, 255, \${alpha * 0.9})\`;
  }
  // Default Cyber Neon
  return baseHex;
}

export function drawPolygon(ctx, cx, cy, radius, sides, angle = 0) {
  if (sides < 3) return;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = angle + (i / sides) * Math.PI * 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, angle = 0) {
  let rot = (Math.PI / 2) * 3 + angle;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}
`;
fs.writeFileSync(path.join(PLUGINS_DIR, 'utils.js'), utilsContent);

// Data structure for all 26 plugins with 4 variants each
const pluginsData = [
  // A: Atomic Flash
  {
    key: 'A',
    name: 'Atomic Flash',
    bank: 'flash',
    bankTitle: '⚡ BANK 1: FLASH & STROBE 爆闪与快门',
    desc: '全屏核爆 24Hz 极限爆闪与能量脉冲',
    variants: [
      {
        id: 'var1',
        name: 'Atomic Blitz',
        desc: '全屏 24Hz 极限白炽爆闪',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  const flashRate = 120 * speed;
  const flash = Math.sin(time * flashRate) > 0 ? 1 : 0.08;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.fillStyle = (v === 2)
    ? \`hsla(\${(time * 300) % 360}, 100%, 75%, \${flash * p})\`
    : \`rgba(255, 255, 255, \${flash * p})\`;
  ctx.fillRect(0, 0, w, h);
}`
      },
      {
        id: 'var2',
        name: 'Hyper Syncopation',
        desc: '三倍率切分音错位极速闪光',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  const flash1 = Math.sin(time * 150 * speed) > 0.4 ? 1 : 0;
  const flash2 = Math.cos(time * 210 * speed) > 0.5 ? 0.8 : 0;
  const combined = Math.max(flash1, flash2) * p;
  if (combined > 0.01) {
    ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
    ctx.fillStyle = (v === 2)
      ? \`hsla(\${(time * 400 + 60) % 360}, 100%, 80%, \${combined})\`
      : \`rgba(240, 250, 255, \${combined})\`;
    ctx.fillRect(0, 0, w, h);
  }
}`
      },
      {
        id: 'var3',
        name: 'Chrono Radial Burst',
        desc: '中心扩散式径向能量脉冲爆闪',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, maxDim, time, speed, intensity: p, globalVariant: v } = state;
  const flashRate = 80 * speed;
  const flash = (Math.sin(time * flashRate) * 0.5 + 0.5) * p;
  if (flash > 0.05) {
    ctx.save();
    ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxDim * 0.85);
    grad.addColorStop(0, \`rgba(255, 255, 255, \${flash})\`);
    grad.addColorStop(0.4, (v === 2) ? \`hsla(\${(time * 200) % 360}, 100%, 60%, \${flash * 0.8})\` : \`rgba(0, 240, 255, \${flash * 0.7})\`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}`
      },
      {
        id: 'var4',
        name: 'Static Slices Strobe',
        desc: '高频噪波水平随机切片频闪',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const slices = 12;
  const sliceH = h / slices;
  for (let i = 0; i < slices; i++) {
    const isLit = Math.sin(time * 90 * speed + i * 2.3) > 0.2;
    if (isLit) {
      ctx.fillStyle = (v === 2)
        ? \`hsla(\${(time * 350 + i * 30) % 360}, 100%, 70%, \${p * 0.9})\`
        : (v === 3 ? \`rgba(255, 255, 255, \${p * 0.9})\` : \`rgba(255, 220, 240, \${p * 0.85})\`);
      ctx.fillRect(0, i * sliceH, w, sliceH - 2);
    }
  }
}`
      }
    ]
  },

  // B: Blind Slats
  {
    key: 'B',
    name: 'Blind Slats',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '百叶窗光栅高速横扫与百叶光刀',
    variants: [
      {
        id: 'var1',
        name: 'Down Slat Runner',
        desc: '经典向下高速滑动的青色百叶光栅',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const bars = (v === 1) ? 44 : 22;
  const barH = h / bars;
  const offset = (time * 450) % (barH * 2);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, 0, time, v);
  for (let y = -barH * 2; y < h + barH * 2; y += barH * 2) {
    ctx.fillRect(0, y + offset, w, (v === 1 ? barH * 0.5 : barH));
  }
}`
      },
      {
        id: 'var2',
        name: 'Vertical Pillar Sweeper',
        desc: '高密度纵向竖条激光光栅左右横扫',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const bars = 30;
  const barW = w / bars;
  const offset = (time * 500) % (barW * 2);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 255, 180, 0.85)', p * 0.85, 120, time, v);
  for (let x = -barW * 2; x < w + barW * 2; x += barW * 2) {
    ctx.fillRect(x + offset, 0, barW * 0.7, h);
  }
}`
      },
      {
        id: 'var3',
        name: 'Chevron Arrows',
        desc: 'V字形巨型箭头光栅高速下落',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 14 * p;
  const count = 10;
  const spacing = h / count;
  const offset = (time * 400) % (spacing * 2);
  for (let i = -2; i < count + 2; i++) {
    const y = i * spacing + offset;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, i * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(0, y - 80);
    ctx.lineTo(cx, y + 40);
    ctx.lineTo(w, y - 80);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Matrix Checker Blinds',
        desc: '双向交错移动的棋盘方块百叶窗',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const rows = 12;
  const cols = 16;
  const cw = w / cols;
  const rh = h / rows;
  for (let r = 0; r < rows; r++) {
    const dir = (r % 2 === 0) ? 1 : -1;
    const xOff = (time * 300 * dir) % (cw * 2);
    ctx.fillStyle = utils.getStyleColor('rgba(255, 230, 0, 0.8)', p * 0.8, r * 20, time, v);
    for (let c = -2; c < cols + 2; c += 2) {
      ctx.fillRect(c * cw + xOff, r * rh, cw, rh - 3);
    }
  }
}`
      }
    ]
  },

  // C: Cyber Crosshair
  {
    key: 'C',
    name: 'Cyber Cross',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '旋转十字激光空间切割与战术光刃',
    variants: [
      {
        id: 'var1',
        name: 'Single Rotary Cross',
        desc: '经典全屏旋转高能十字光刃',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2.5);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 80, 0.9)', p, 0, time, v);
  ctx.fillRect(-maxDim, -4 * p, maxDim * 2, 8 * p);
  ctx.fillRect(-4 * p, -maxDim, 8 * p, maxDim * 2);
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Octo Star Blades',
        desc: '八向双层极速对转激光十字光剑',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.translate(cx, cy);
  // Layer 1
  ctx.save();
  ctx.rotate(time * 4.0);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p, 0, time, v);
  ctx.fillRect(-maxDim, -3 * p, maxDim * 2, 6 * p);
  ctx.fillRect(-3 * p, -maxDim, 6 * p, maxDim * 2);
  ctx.restore();
  // Layer 2
  ctx.save();
  ctx.rotate(-time * 3.0 + Math.PI / 4);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p, 180, time, v);
  ctx.fillRect(-maxDim, -2 * p, maxDim * 2, 4 * p);
  ctx.fillRect(-2 * p, -maxDim, 4 * p, maxDim * 2);
  ctx.restore();
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Radar Sweep Blade',
        desc: '360° 雷达扫描激光刀与磷光拖尾',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const ang = time * 4.5;
  // Radar fan trail
  const trailSegments = 16;
  for (let i = 0; i < trailSegments; i++) {
    const a1 = ang - (i / trailSegments) * (Math.PI / 2);
    const a2 = ang - ((i + 1) / trailSegments) * (Math.PI / 2);
    const alpha = (1 - i / trailSegments) * 0.4 * p;
    ctx.fillStyle = utils.getStyleColor(\`rgba(0, 255, 120, \${alpha})\`, alpha, 90, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim, a2, a1);
    ctx.closePath();
    ctx.fill();
  }
  // Sharp leading edge
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.95)', p * 0.95, 0, time, v);
  ctx.lineWidth = 3 * p;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(ang) * maxDim, Math.sin(ang) * maxDim);
  ctx.stroke();
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Segmented Target Box',
        desc: '战术锁定准星与四角动态括号光刃',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 180, 0, 0.9)', p, 45, time, v);
  ctx.lineWidth = 3.5 * p;
  const sz = 120 * p + Math.sin(time * 8) * 20;
  // Box brackets
  const bL = 40;
  // Top-left
  ctx.beginPath(); ctx.moveTo(-sz, -sz + bL); ctx.lineTo(-sz, -sz); ctx.lineTo(-sz + bL, -sz); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(sz - bL, -sz); ctx.lineTo(sz, -sz); ctx.lineTo(sz, -sz + bL); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(sz, sz - bL); ctx.lineTo(sz, sz); ctx.lineTo(sz - bL, sz); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(-sz + bL, sz); ctx.lineTo(-sz, sz); ctx.lineTo(-sz, sz - bL); ctx.stroke();
  // Inner cross
  ctx.beginPath();
  ctx.moveTo(-sz * 0.6, 0); ctx.lineTo(sz * 0.6, 0);
  ctx.moveTo(0, -sz * 0.6); ctx.lineTo(0, sz * 0.6);
  ctx.stroke();
  ctx.restore();
}`
      }
    ]
  },

  // D: Diamond Corridor
  {
    key: 'D',
    name: 'Diamond Corridor',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '同心霓虹菱形无限扩散与多维穿梭',
    variants: [
      {
        id: 'var1',
        name: 'Classic Diamond Zoom',
        desc: '同心霓虹菱形向屏幕扑面放大',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.8) % 1);
    const sz = prog * maxDim * 0.85;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 230, 0, \${p * (1 - prog)})\`, p * (1 - prog), i * 40, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz);
    ctx.lineTo(cx + sz, cy);
    ctx.lineTo(cx, cy + sz);
    ctx.lineTo(cx - sz, cy);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Octa Star Portal',
        desc: '八角星多维空间几何扩散通道',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const count = 10;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.7) % 1);
    const sz = prog * maxDim * 0.9;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * (1 - prog)})\`, p * (1 - prog), i * 35, time, v);
    ctx.beginPath();
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2 + (i % 2 === 0 ? time : -time) * 0.5;
      const r = (a % 2 === 0) ? sz : sz * 0.5;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Twisting Square Box',
        desc: '旋转方框交替扭曲立体隧道',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const count = 9;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.9) % 1);
    const sz = prog * maxDim * 0.8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(prog * Math.PI + time * 0.5);
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 0, 180, \${p * (1 - prog)})\`, p * (1 - prog), i * 45, time, v);
    ctx.strokeRect(-sz * 0.5, -sz * 0.5, sz, sz);
    ctx.restore();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: '3D Perspective Wire Corridor',
        desc: '透视菱形走廊带四角连接线',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  // Corner depth lines
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.4)', p * 0.4, 0, time, v);
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - maxDim * 0.8);
  ctx.moveTo(cx, cy); ctx.lineTo(cx + maxDim * 0.8, cy);
  ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + maxDim * 0.8);
  ctx.moveTo(cx, cy); ctx.lineTo(cx - maxDim * 0.8, cy);
  ctx.stroke();

  const count = 8;
  for (let i = 0; i < count; i++) {
    const prog = Math.pow(((i / count + time * 0.8) % 1), 2);
    const sz = prog * maxDim * 0.8;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 200, 0, \${p * (1 - prog)})\`, p * (1 - prog), i * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz); ctx.lineTo(cx + sz, cy); ctx.lineTo(cx, cy + sz); ctx.lineTo(cx - sz, cy);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}`
      }
    ]
  },

  // E: Electric Arcs
  {
    key: 'E',
    name: 'Electric Arcs',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '高压电弧雷暴全屏随机电击',
    variants: [
      {
        id: 'var1',
        name: 'Vertical Thunderbolts',
        desc: '纵向全屏落雷劈裂分叉电弧',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = utils.getStyleColor(\`rgba(180, 100, 255, \${p * 0.9})\`, p * 0.9, 260, time, v);
  ctx.lineWidth = 3.0 * p;
  const arcs = 4;
  for (let a = 0; a < arcs; a++) {
    ctx.beginPath();
    let curX = cx + Math.sin(time * 15 + a * 2.5) * w * 0.38;
    let curY = 0;
    ctx.moveTo(curX, curY);
    while (curY < h) {
      curX += (Math.random() - 0.5) * 50 + Math.sin(curY * 0.05 + time * 40 + a) * 35;
      curY += 22;
      ctx.lineTo(curX, curY);
    }
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Tesla Cage Converge',
        desc: '四边聚向屏幕中心的特斯拉电笼',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * 0.85})\`, p * 0.85, 190, time, v);
  ctx.lineWidth = 2.0 * p;
  const bolts = 8;
  for (let b = 0; b < bolts; b++) {
    const ang = (b / bolts) * Math.PI * 2 + time * 2;
    let startX = cx + Math.cos(ang) * Math.max(w, h) * 0.6;
    let startY = cy + Math.sin(ang) * Math.max(w, h) * 0.6;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let steps = 12;
    for (let s = 1; s <= steps; s++) {
      const frac = s / steps;
      let tx = startX + (cx - startX) * frac + (Math.random() - 0.5) * 30 * (1 - frac);
      let ty = startY + (cy - startY) * frac + (Math.random() - 0.5) * 30 * (1 - frac);
      ctx.lineTo(tx, ty);
    }
    ctx.stroke();
  }
}`
      },
      {
        id: 'var3',
        name: 'Radial Plasma Ball',
        desc: '中心等离子球体向外喷射混乱等离子',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const rays = 16;
  for (let i = 0; i < rays; i++) {
    const baseAng = (i / rays) * Math.PI * 2 + time * 3;
    const len = 250 * p + Math.sin(time * 20 + i) * 80 * p;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 0, 180, \${p * 0.85})\`, p * 0.85, i * 20, time, v);
    ctx.lineWidth = (Math.random() * 2 + 1.5) * p;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    let segs = 8;
    for (let s = 1; s <= segs; s++) {
      const r = (s / segs) * len;
      const a = baseAng + (Math.sin(s * 2 + time * 30) * 0.25);
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Clashing Dual Arc',
        desc: '左右高压电极在中央激烈对撞爆出火花',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 240, 50, \${p * 0.9})\`, p * 0.9, 60, time, v);
  // Left arc
  ctx.beginPath();
  let x = 0, y = cy + Math.sin(time * 10) * 80;
  ctx.moveTo(x, y);
  while (x < cx) {
    x += 25;
    y += (Math.random() - 0.5) * 45;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Right arc
  ctx.beginPath();
  x = w; y = cy - Math.sin(time * 10) * 80;
  ctx.moveTo(x, y);
  while (x > cx) {
    x -= 25;
    y += (Math.random() - 0.5) * 45;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}`
      }
    ]
  },

  // F: Fan Scanner Lasers
  {
    key: 'F',
    name: 'Fan Lasers',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '扇形全景高能激光阵列与地面扫射',
    variants: [
      {
        id: 'var1',
        name: 'Floor Laser Fan',
        desc: '地面向上仰角180°大扇形动态摇摆激光',
        code: `(ctx, state) => {
  const { height: h, cx, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const beams = 18;
  for (let i = 0; i < beams; i++) {
    const baseAngle = Math.PI + (i / (beams - 1)) * Math.PI;
    const swing = Math.sin(time * 4 + i * 0.3) * 0.18;
    const angle = baseAngle + swing;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 255, 128, \${p * 0.8})\`, p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, h);
    ctx.lineTo(cx + Math.cos(angle) * maxDim, h + Math.sin(angle) * maxDim);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Ceiling & Floor Dual Fan',
        desc: '上下天花板与地板双重交叉对射激光扇',
        code: `(ctx, state) => {
  const { height: h, cx, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const beams = 20;
  for (let i = 0; i < beams; i++) {
    const swing = Math.sin(time * 5 + i * 0.25) * 0.2;
    // Bottom
    const bAngle = Math.PI + (i / (beams - 1)) * Math.PI + swing;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * 0.75})\`, p * 0.75, i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, h);
    ctx.lineTo(cx + Math.cos(bAngle) * maxDim, h + Math.sin(bAngle) * maxDim);
    ctx.stroke();
    // Top
    const tAngle = (i / (beams - 1)) * Math.PI - swing;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 0, 128, \${p * 0.75})\`, p * 0.75, i * 15 + 180, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx + Math.cos(tAngle) * maxDim, Math.sin(tAngle) * maxDim);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var3',
        name: '3D Conical Laser Array',
        desc: '3D 立体圆锥形激光束全景旋转扫射',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const beams = 24;
  for (let i = 0; i < beams; i++) {
    const ang = (i / beams) * Math.PI * 2 + time * 3;
    const endX = cx + Math.cos(ang) * (w * 0.6);
    const endY = h * 0.2 + (Math.sin(ang) * 0.5 + 0.5) * (h * 0.8);
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 230, 0, \${p * 0.8})\`, p * 0.8, i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var4',
        name: 'High Density Laser Fingers',
        desc: '48 路超高密度矩阵激光指尖舞动',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.5 * p;
  const fingers = 36;
  for (let i = 0; i < fingers; i++) {
    const startX = (i / (fingers - 1)) * w;
    const sway = Math.sin(time * 6 + i * 0.4) * (w * 0.3);
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 255, 200, \${p * 0.75})\`, p * 0.75, i * 10, time, v);
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + sway, h);
    ctx.stroke();
  }
}`
      }
    ]
  },

  // G: Glitch Chromatic RGB
  {
    key: 'G',
    name: 'Glitch RGB',
    bank: 'flash',
    bankTitle: '⚡ BANK 1: FLASH & STROBE 爆闪与快门',
    desc: '色相错位分离频闪与画面噪波切片',
    variants: [
      {
        id: 'var1',
        name: 'RGB Channel Displace',
        desc: '红青双通道水平大幅度错位分裂',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'screen';
  const shift = Math.sin(time * 30) * 45 * p;
  ctx.fillStyle = \`rgba(255, 0, 0, \${p * 0.5})\`;
  ctx.fillRect(-shift, 0, w, h);
  ctx.fillStyle = \`rgba(0, 255, 255, \${p * 0.5})\`;
  ctx.fillRect(shift, 0, w, h);
}`
      },
      {
        id: 'var2',
        name: 'CRT Horizontal Tears',
        desc: 'CRT 显像管行同步丢失横向撕裂带',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = 'difference';
  const strips = 8;
  for (let i = 0; i < strips; i++) {
    const isTorn = Math.sin(time * 40 + i * 5) > 0.3;
    if (isTorn) {
      const y = (i / strips) * h;
      const sh = h / strips * 0.6;
      ctx.fillStyle = \`rgba(255, 255, 255, \${p * 0.8})\`;
      ctx.fillRect(0, y, w, sh);
    }
  }
}`
      },
      {
        id: 'var3',
        name: 'VCR VHS Static Noise',
        desc: '复古录像带磁头白噪点条纹杂波',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'lighter';
  const noiseBars = 15;
  for (let i = 0; i < noiseBars; i++) {
    const y = ((time * 800 + i * (h / noiseBars)) % h);
    const nh = Math.random() * 8 + 2;
    ctx.fillStyle = \`rgba(200, 230, 255, \${p * 0.6 * Math.random()})\`;
    ctx.fillRect(0, y, w, nh);
  }
}`
      },
      {
        id: 'var4',
        name: 'Pixel Block Glitch',
        desc: '随机跳动的像素色块数据损坏矩阵',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const blocks = 14;
  for (let i = 0; i < blocks; i++) {
    const bx = Math.sin(i * 123 + time * 20) * w * 0.5 + w * 0.5;
    const by = Math.cos(i * 456 + time * 20) * h * 0.5 + h * 0.5;
    const bw = (Math.sin(i + time * 10) * 0.5 + 0.5) * 120 + 30;
    const bh = (Math.cos(i + time * 10) * 0.5 + 0.5) * 40 + 10;
    ctx.fillStyle = (i % 2 === 0) ? \`rgba(255, 0, 100, \${p * 0.7})\` : \`rgba(0, 255, 220, \${p * 0.7})\`;
    ctx.fillRect(bx - bw * 0.5, by - bh * 0.5, bw, bh);
  }
}`
      }
    ]
  },

  // H: Hexagon Shield
  {
    key: 'H',
    name: 'Hex Shield',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '旋转蜂窝六边形能量环与多层护盾',
    variants: [
      {
        id: 'var1',
        name: 'Concentric Hex Rings',
        desc: '旋转同心六边形能量波向外扩散',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.5);
  ctx.lineWidth = 3.5 * p;
  const rings = 5;
  for (let ring = 1; ring <= rings; ring++) {
    const rad = ((ring / rings + time * 0.4) % 1) * maxDim * 0.6;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p})\`, p * (1 - rad / (maxDim * 0.6)), ring * 45, time, v);
    utils.drawPolygon(ctx, 0, 0, rad, 6);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Hex Grid Honeycomb',
        desc: '全屏蜂窝六边形点阵能量网',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.8 * p;
  const hexR = 50;
  const hDist = hexR * Math.sqrt(3);
  const vDist = hexR * 1.5;
  for (let y = -hexR; y < h + hexR * 2; y += vDist) {
    const row = Math.floor(y / vDist);
    const xOff = (row % 2 === 0) ? 0 : hDist * 0.5;
    for (let x = -hexR; x < w + hexR * 2; x += hDist) {
      const pulse = Math.sin(time * 8 + (x + y) * 0.01) * 0.5 + 0.5;
      ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 180, 0, \${p * pulse * 0.75})\`, p * pulse * 0.75, (x + y) * 0.1, time, v);
      utils.drawPolygon(ctx, x + xOff, y, hexR * 0.85, 6, Math.PI / 6);
      ctx.stroke();
    }
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Dual Hexagram Merkabah',
        desc: '双重反向旋转大卫之星能量阵',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.0 * p;
  const sz = maxDim * 0.35 * p;
  // Star 1
  ctx.save();
  ctx.rotate(time * 2);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 120, 0.9)', p * 0.9, 0, time, v);
  utils.drawPolygon(ctx, 0, 0, sz, 3, -Math.PI / 2); ctx.stroke();
  utils.drawPolygon(ctx, 0, 0, sz, 3, Math.PI / 2); ctx.stroke();
  ctx.restore();
  // Star 2
  ctx.save();
  ctx.rotate(-time * 2.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 230, 0.9)', p * 0.9, 180, time, v);
  utils.drawPolygon(ctx, 0, 0, sz * 0.6, 3, -Math.PI / 2); ctx.stroke();
  utils.drawPolygon(ctx, 0, 0, sz * 0.6, 3, Math.PI / 2); ctx.stroke();
  ctx.restore();
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: '3D Wireframe Hex Prism',
        desc: '3D 立体旋转六棱柱透视骨架',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.5 * p;
  const rTop = 180 * p, rBot = 180 * p;
  const hPrism = 220;
  const rot = time * 2;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 150, 0.85)', p * 0.85, 90, time, v);
  // Top & Bottom caps
  utils.drawPolygon(ctx, 0, -hPrism * 0.5, rTop, 6, rot); ctx.stroke();
  utils.drawPolygon(ctx, 0, hPrism * 0.5, rBot, 6, rot); ctx.stroke();
  // Vertical struts
  for (let i = 0; i < 6; i++) {
    const a = rot + (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * rTop;
    const yOffset = Math.sin(a) * 30;
    ctx.beginPath();
    ctx.moveTo(x, -hPrism * 0.5 + yOffset);
    ctx.lineTo(x, hPrism * 0.5 + yOffset);
    ctx.stroke();
  }
  ctx.restore();
}`
      }
    ]
  },

  // I: Iris Tunnel
  {
    key: 'I',
    name: 'Iris Tunnel',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '超空间环形光圈隧道与机械快门',
    variants: [
      {
        id: 'var1',
        name: 'Circular Shockwaves',
        desc: '超空间圆形冲击波环极速冲脸',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const rings = 8;
  for (let r = 0; r < rings; r++) {
    const prog = (r / rings + time * 0.7) % 1;
    const ringRad = prog * maxDim * 0.75;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 40, 130, \${p})\`, p * (1 - prog), r * 30, time, v);
    ctx.beginPath();
    ctx.arc(cx, cy, ringRad, 0, Math.PI * 2);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Aperture Blade Iris',
        desc: '机械镜头多片光圈光速开合',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  ctx.lineWidth = 3.0 * p;
  const blades = 10;
  const apertureR = (Math.sin(time * 8) * 0.3 + 0.5) * maxDim * 0.35 * p;
  for (let i = 0; i < blades; i++) {
    const ang = (i / blades) * Math.PI * 2;
    const p1x = Math.cos(ang) * apertureR;
    const p1y = Math.sin(ang) * apertureR;
    const p2x = Math.cos(ang + 0.8) * maxDim * 0.6;
    const p2y = Math.sin(ang + 0.8) * maxDim * 0.6;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * 0.9})\`, p * 0.9, i * 25, time, v);
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Dashed Target Rings',
        desc: '多层虚线环反向交错高速旋转',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const rings = 6;
  for (let i = 1; i <= rings; i++) {
    const rad = (i / rings) * maxDim * 0.45 * p;
    const dir = (i % 2 === 0) ? 1 : -1;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 3 * dir);
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 230, 0, \${p * 0.85})\`, p * 0.85, i * 40, time, v);
    ctx.setLineDash([20, 15]);
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Concentric Eclipse Rings',
        desc: '偏心重力透镜双光环交错扩散',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.6) % 1);
    const rad = prog * maxDim * 0.7;
    const offX = Math.sin(time * 4 + i) * 40;
    const offY = Math.cos(time * 4 + i) * 40;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(180, 0, 255, \${p * (1 - prog)})\`, p * (1 - prog), i * 30, time, v);
    ctx.beginPath();
    ctx.arc(cx + offX, cy + offY, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
}`
      }
    ]
  },

  // J: Jolt Scanlines
  {
    key: 'J',
    name: 'Jolt Scanline',
    bank: 'flash',
    bankTitle: '⚡ BANK 1: FLASH & STROBE 爆闪与快门',
    desc: 'CRT 显像管高速光栅与频闪切片',
    variants: [
      {
        id: 'var1',
        name: 'Difference Raster Jump',
        desc: '反色高速扫描光栅硬切',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.fillStyle = \`rgba(255, 255, 255, \${p})\`;
  const sliceH = 14;
  const yOff = (time * 800) % (sliceH * 4);
  for (let y = -sliceH * 4; y < h + sliceH * 4; y += sliceH * 4) {
    ctx.fillRect(0, y + yOff, w, sliceH);
  }
}`
      },
      {
        id: 'var2',
        name: 'Interlaced Strobe Rows',
        desc: '隔行隔帧交替硬核黑白频闪',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const rowH = 6;
  const isOdd = Math.sin(time * 120 * speed) > 0;
  ctx.fillStyle = (v === 2) ? \`hsla(\${(time * 300) % 360}, 100%, 70%, \${p * 0.8})\` : \`rgba(255, 255, 255, \${p * 0.8})\`;
  for (let y = (isOdd ? 0 : rowH); y < h; y += rowH * 2) {
    ctx.fillRect(0, y, w, rowH);
  }
}`
      },
      {
        id: 'var3',
        name: 'High Frequency Grid Shutter',
        desc: '高频纵横交错棋盘闪烁光栅',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const gridSz = 24;
  const frame = Math.floor(time * 30 * speed);
  ctx.fillStyle = \`rgba(255, 255, 255, \${p * 0.9})\`;
  for (let y = 0; y < h; y += gridSz) {
    for (let x = 0; x < w; x += gridSz) {
      if ((Math.floor(x / gridSz) + Math.floor(y / gridSz) + frame) % 2 === 0) {
        ctx.fillRect(x, y, gridSz, gridSz);
      }
    }
  }
}`
      },
      {
        id: 'var4',
        name: 'Phosphor Green Scan Bar',
        desc: '绿磷光超亮光束扫过伴随衰减拖尾',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const barY = (time * 600) % (h + 200) - 100;
  const grad = ctx.createLinearGradient(0, barY - 120, 0, barY + 20);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.8, utils.getStyleColor('rgba(0, 255, 80, 0.4)', p * 0.4, 120, time, v));
  grad.addColorStop(1, utils.getStyleColor('rgba(200, 255, 200, 0.95)', p * 0.95, 120, time, v));
  ctx.fillStyle = grad;
  ctx.fillRect(0, barY - 120, w, 140);
}`
      }
    ]
  },

  // K: Kaleido Mandala
  {
    key: 'K',
    name: 'Kaleidoscope',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '八重对称万花筒旋转与神圣几何',
    variants: [
      {
        id: 'var1',
        name: 'Octa Mandala Circles',
        desc: '八重对称万花筒旋转环绕环',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 3);
  ctx.lineWidth = 2.5 * p;
  const branches = 8;
  const sz = (Math.sin(time * 6) * 0.3 + 0.7) * 160 * p;
  for (let i = 0; i < branches; i++) {
    ctx.rotate((Math.PI * 2) / branches);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 170, 0, 0.85)', p * 0.85, i * 30, time, v);
    ctx.beginPath();
    ctx.arc(50, 50, sz * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Flower of Life Hexa',
        desc: '十二瓣神圣生命之花向外绽放',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 1.5);
  ctx.lineWidth = 2.0 * p;
  const petals = 12;
  const rad = 130 * p;
  for (let i = 0; i < petals; i++) {
    const ang = (i / petals) * Math.PI * 2;
    const px = Math.cos(ang) * rad;
    const py = Math.sin(ang) * rad;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 200, 0.8)', p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Crystalline Geometric Shards',
        desc: '八角锐利水晶折纸万花筒',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2.5);
  ctx.lineWidth = 2.5 * p;
  const arms = 8;
  const sz = 180 * p;
  for (let i = 0; i < arms; i++) {
    ctx.rotate((Math.PI * 2) / arms);
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 35, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(sz * 0.7, sz * 0.3);
    ctx.lineTo(sz, 0);
    ctx.lineTo(sz * 0.7, -sz * 0.3);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Quad Mirror Kaleidoscope',
        desc: '四象限对称多重折射方块光阵',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const squares = 16;
  for (let i = 0; i < squares; i++) {
    const ang = (i / squares) * Math.PI * 2 + time * 2;
    const dist = (Math.sin(time * 5 + i) * 0.2 + 0.8) * 160 * p;
    ctx.save();
    ctx.translate(Math.cos(ang) * dist, Math.sin(ang) * dist);
    ctx.rotate(time * 4 + i);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 240, 0, 0.85)', p * 0.85, i * 20, time, v);
    ctx.strokeRect(-20 * p, -20 * p, 40 * p, 40 * p);
    ctx.restore();
  }
  ctx.restore();
}`
      }
    ]
  },

  // L: Laser Curtain
  {
    key: 'L',
    name: 'Lightning Rain',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '垂直光速激光落雷暴击与光幕',
    variants: [
      {
        id: 'var1',
        name: 'Sine Wave Curtain',
        desc: '正弦波动态呼吸垂直激光光幕',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const lines = 28;
  for (let l = 0; l < lines; l++) {
    const lx = (l / lines) * w;
    const alpha = (Math.sin(time * 25 + l * 1.5) * 0.5 + 0.5) * p;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 230, 255, \${alpha})\`, alpha, l * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(lx, 0);
    ctx.lineTo(lx, h);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Hyper Velocity Rain',
        desc: '光速下落的垂直激光雨针',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const drops = 36;
  for (let i = 0; i < drops; i++) {
    const x = ((i * 137.5) % w);
    const speed = 800 + (i % 5) * 200;
    const y = (time * speed + i * 50) % (h + 300) - 150;
    const len = 120 + (i % 4) * 40;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.9)', p * 0.9, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + len);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var3',
        name: 'Oscillating Laser Pillars',
        desc: '左右大幅摆动的重型激光光柱',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const pillars = 6;
  for (let i = 0; i < pillars; i++) {
    const x = (w * 0.5) + Math.sin(time * 4 + i * 1.2) * (w * 0.42);
    const pw = (Math.sin(time * 15 + i) * 4 + 10) * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 100, 0.85)', p * 0.85, i * 40, time, v);
    ctx.fillRect(x - pw * 0.5, 0, pw, h);
  }
}`
      },
      {
        id: 'var4',
        name: 'Converging Perspective Beams',
        desc: '透视汇聚到顶部的重型光束矩阵',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const count = 20;
  for (let i = 0; i < count; i++) {
    const bx = (i / (count - 1)) * w;
    const alpha = (Math.sin(time * 18 + i) * 0.4 + 0.6) * p;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 255, 180, \${alpha})\`, alpha, i * 18, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, -50);
    ctx.lineTo(bx, h);
    ctx.stroke();
  }
}`
      }
    ]
  },

  // M: Matrix Grid
  {
    key: 'M',
    name: 'Matrix Grid',
    bank: 'synthwave',
    bankTitle: '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线',
    desc: '3D 赛博舞池透视网格与无限穿梭',
    variants: [
      {
        id: 'var1',
        name: 'Outrun Floor Grid',
        desc: '经典 Outrun 赛博合成波地面网格',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const fY = h * 0.58;
  const fH = h - fY;
  ctx.lineWidth = 1.8 * p;
  // Vertical perspective rays
  for (let g = -12; g <= 12; g++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 180, 0.65)', p * 0.65, g * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, fY);
    ctx.lineTo(cx + g * (w / 10), h);
    ctx.stroke();
  }
  // Horizontal racing bars
  const rows = 11;
  const offset = (time * 1.5) % 1;
  for (let r = 0; r < rows; r++) {
    const prog = (r + offset) / rows;
    const y = fY + Math.pow(prog, 2.5) * fH;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * prog * 0.9})\`, p * prog * 0.9, r * 25, time, v);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Dual Ceiling & Floor Tunnel',
        desc: '上下双重天花板与地板无限透视隧道',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.6 * p;
  const renderHalf = (originY, targetY, isCeiling) => {
    const dist = Math.abs(targetY - originY);
    for (let g = -10; g <= 10; g++) {
      ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.6)', p * 0.6, g * 15, time, v);
      ctx.beginPath();
      ctx.moveTo(cx, originY);
      ctx.lineTo(cx + g * (w / 8), targetY);
      ctx.stroke();
    }
    const rows = 9;
    const offset = (time * 1.8) % 1;
    for (let r = 0; r < rows; r++) {
      const prog = (r + offset) / rows;
      const y = isCeiling ? originY - Math.pow(prog, 2.2) * dist : originY + Math.pow(prog, 2.2) * dist;
      ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * prog * 0.85})\`, p * prog * 0.85, r * 20, time, v);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };
  renderHalf(h * 0.58, h, false);
  renderHalf(h * 0.42, 0, true);
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Terrain Wire Canyon',
        desc: '3D 伏线波浪高低起伏赛博山谷峡谷',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const rows = 14;
  for (let r = 0; r < rows; r++) {
    const prog = r / rows;
    const baseY = h * 0.5 + Math.pow(prog, 2) * (h * 0.5);
    ctx.strokeStyle = utils.getStyleColor(\`rgba(0, 255, 200, \${p * prog * 0.9})\`, p * prog * 0.9, r * 20, time, v);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 20) {
      const hill = Math.sin(x * 0.015 + time * 5 + r) * (prog * 60);
      const y = baseY + hill;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Floor Equalizer Pillars Grid',
        desc: '透视网格上拔地而起的立体柱状阵列',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const fY = h * 0.6;
  const cols = 12;
  for (let c = -cols; c <= cols; c++) {
    const bx = cx + c * (w / 14);
    const colH = (Math.sin(c * 0.8 + time * 10) * 0.5 + 0.5) * 120 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 220, 0, 0.8)', p * 0.8, c * 25, time, v);
    ctx.lineWidth = 2.5 * p;
    ctx.beginPath();
    ctx.moveTo(bx, h);
    ctx.lineTo(bx, h - colH);
    ctx.stroke();
  }
  ctx.restore();
}`
      }
    ]
  },

  // N: Nova Starburst
  {
    key: 'N',
    name: 'Nova Starburst',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '旋转八芒星超新星光芒与光学耀斑',
    variants: [
      {
        id: 'var1',
        name: 'Optical Flare Cross',
        desc: '经典八向光学耀斑旋转脉冲',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  const pulse = (Math.sin(time * 10) * 0.2 + 0.8) * p;
  ctx.fillStyle = utils.getStyleColor(\`rgba(255, 255, 255, \${pulse * 0.9})\`, pulse * 0.9, 0, time, v);
  ctx.beginPath();
  ctx.ellipse(0, 0, maxDim * 0.6, 3.5 * p, 0, 0, Math.PI * 2);
  ctx.ellipse(0, 0, 3.5 * p, maxDim * 0.6, 0, 0, Math.PI * 2);
  ctx.ellipse(0, 0, maxDim * 0.4, 2 * p, Math.PI / 4, 0, Math.PI * 2);
  ctx.ellipse(0, 0, 2 * p, maxDim * 0.4, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Supernova Shockwave',
        desc: '超新星向外爆炸扩散的冲击波与光子',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const prog = (time * 1.5) % 1;
  const shockR = prog * maxDim * 0.6;
  ctx.lineWidth = (1 - prog) * 12 * p;
  ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 100, 50, \${p * (1 - prog)})\`, p * (1 - prog), 30, time, v);
  ctx.beginPath();
  ctx.arc(cx, cy, shockR, 0, Math.PI * 2);
  ctx.stroke();

  // Core glow
  const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 80 * p);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.5, 'rgba(255,180,0,0.8)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - 80, cy - 80, 160, 160);
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Pulsar Relativistic Jets',
        desc: '脉冲星两极喷射极速自转等离子流',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 6);
  ctx.lineWidth = 4 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.95)', p * 0.95, 190, time, v);
  // Jets
  ctx.beginPath();
  ctx.moveTo(0, -maxDim * 0.7);
  ctx.lineTo(0, maxDim * 0.7);
  ctx.stroke();
  // Beam fan
  for (let j = -2; j <= 2; j++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 200, 0.6)', p * 0.6, j * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(j * 40, -maxDim * 0.7);
    ctx.moveTo(0, 0); ctx.lineTo(-j * 40, maxDim * 0.7);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: '16-Spike Starlight Crown',
        desc: '十六芒星刺向外绽放的钻石星冠',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 1.5);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 230, 100, 0.85)', p * 0.85, 45, time, v);
  utils.drawStar(ctx, 0, 0, 16, 220 * p, 40 * p);
  ctx.fill();
  ctx.restore();
}`
      }
    ]
  },

  // O: Orbit Gyroscope
  {
    key: 'O',
    name: 'Orbit Rings',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '交叉立体陀螺仪光环与原子轨道',
    variants: [
      {
        id: 'var1',
        name: 'Triple Gyro Gimbals',
        desc: '三轴交叉动态旋转立体陀螺仪环',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 170, 0.85)', p * 0.85, 150, time, v);
  ctx.beginPath();
  ctx.ellipse(0, 0, 260 * p, 90 * p, time * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, 0, 260 * p, 90 * p, -time * 3 + Math.PI / 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Atomic Orbitals Particles',
        desc: '卢瑟福原子模型高速运转电子粒子',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const orbits = 4;
  for (let o = 0; o < orbits; o++) {
    const tilt = (o / orbits) * Math.PI;
    ctx.lineWidth = 2.0 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 200, 255, 0.5)', p * 0.5, o * 40, time, v);
    ctx.beginPath();
    ctx.ellipse(0, 0, 240 * p, 70 * p, tilt, 0, Math.PI * 2);
    ctx.stroke();

    // Electron dot
    const eAng = time * (4 + o * 2);
    const ex = Math.cos(eAng) * 240 * p;
    const ey = Math.sin(eAng) * 70 * p;
    const rx = ex * Math.cos(tilt) - ey * Math.sin(tilt);
    const ry = ex * Math.sin(tilt) + ey * Math.cos(tilt);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(rx, ry, 6 * p, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Planetary Halo Disc',
        desc: '土星倾斜立体光环与环缝投影',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const tilt = Math.PI / 6;
  ctx.lineWidth = 3.0 * p;
  const count = 6;
  for (let i = 0; i < count; i++) {
    const radX = (150 + i * 25) * p;
    const radY = (50 + i * 8) * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 180, 50, 0.8)', p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.ellipse(0, 0, radX, radY, tilt + Math.sin(time) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Nested Gyro Spheres',
        desc: '多层同心旋转球体经纬骨架',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.2 * p;
  const spheres = 3;
  for (let s = 1; s <= spheres; s++) {
    const r = s * 75 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 180, 0.75)', p * 0.75, s * 50, time, v);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * Math.sin(time * 2 + s), time * s, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();
}`
      }
    ]
  },

  // P: Prism Wave
  {
    key: 'P',
    name: 'Prism Wave',
    bank: 'synthwave',
    bankTitle: '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线',
    desc: '示波器高振幅光谱波浪与谐波',
    variants: [
      {
        id: 'var1',
        name: 'RGB Separated Sine Waves',
        desc: '红绿蓝三色分离正弦高振幅光谱波浪',
        code: `(ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 4 * p;
  for (let k = 0; k < 3; k++) {
    ctx.strokeStyle = utils.getStyleColor(
      k === 0 ? 'rgba(255, 120, 0, 0.85)' : (k === 1 ? 'rgba(0, 240, 255, 0.85)' : 'rgba(255, 0, 180, 0.85)'),
      p * 0.85,
      k * 60,
      time,
      v
    );
    ctx.beginPath();
    for (let x = 0; x <= w; x += 15) {
      const y = cy + Math.sin(x * 0.012 + time * (18 + k * 4) + k) * (h * 0.28 * p);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Green Phosphor Oscilloscope',
        desc: '高频绿色示波器矢量心电波形',
        code: `(ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 80, 0.95)', p * 0.95, 120, time, v);
  ctx.beginPath();
  for (let x = 0; x <= w; x += 8) {
    const noise = Math.sin(x * 0.05 + time * 30) * Math.cos(x * 0.02 + time * 15);
    const y = cy + noise * (h * 0.35 * p);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}`
      },
      {
        id: 'var3',
        name: 'Multi Harmonics Stack',
        desc: '6 层重叠倍频谐波光谱带',
        code: `(ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const layers = 6;
  for (let l = 1; l <= layers; l++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.7)', p * 0.7, l * 30, time, v);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 15) {
      const y = cy + Math.sin(x * (0.005 * l) + time * 12 + l) * (h * 0.22 * p);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}`
      },
      {
        id: 'var4',
        name: 'Circular Radial Oscilloscope',
        desc: '中央圆形径向频谱声波跳动环',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.0 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p * 0.9, 200, time, v);
  ctx.beginPath();
  const points = 120;
  const baseR = 150 * p;
  for (let i = 0; i <= points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const wave = Math.sin(ang * 8 + time * 20) * 35 * p;
    const r = baseR + wave;
    const x = Math.cos(ang) * r;
    const y = Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}`
      }
    ]
  },

  // Q: Quad Blasters
  {
    key: 'Q',
    name: 'Quad Blasters',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '四角对角重型加农炮与对射能量光束',
    variants: [
      {
        id: 'var1',
        name: 'Center Point Convergence',
        desc: '四角加农炮汇聚中心高能轰击',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const beamW = (Math.sin(time * 20) * 3 + 6) * p;
  ctx.lineWidth = beamW;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 68, 0.85)', p * 0.85, 0, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(cx, cy);
  ctx.moveTo(w, 0); ctx.lineTo(cx, cy);
  ctx.moveTo(0, h); ctx.lineTo(cx, cy);
  ctx.moveTo(w, h); ctx.lineTo(cx, cy);
  ctx.stroke();
}`
      },
      {
        id: 'var2',
        name: 'Perimeter Scanning Blasters',
        desc: '四角炮口沿边缘左右循环扫射',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 4.0 * p;
  const sweep = Math.sin(time * 6) * 0.3;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 230, 0.9)', p * 0.9, 170, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(cx + sweep * w, cy);
  ctx.moveTo(w, 0); ctx.lineTo(cx - sweep * w, cy);
  ctx.moveTo(0, h); ctx.lineTo(cx + sweep * w, cy);
  ctx.moveTo(w, h); ctx.lineTo(cx - sweep * w, cy);
  ctx.stroke();
}`
      },
      {
        id: 'var3',
        name: 'Dual Crossfire Cannon',
        desc: '对角线交叉横贯全屏重型主炮',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = (Math.sin(time * 30) * 4 + 8) * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.95)', p * 0.95, 50, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(w, h);
  ctx.moveTo(w, 0); ctx.lineTo(0, h);
  ctx.stroke();
}`
      },
      {
        id: 'var4',
        name: 'Quad Rotor Beam Turrets',
        desc: '四角炮台发射 360° 自转旋转激光',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const len = 400;
  const corners = [{x: 0, y: 0}, {x: w, y: 0}, {x: 0, y: h}, {x: w, y: h}];
  corners.forEach((c, idx) => {
    const ang = time * 4 + idx * (Math.PI / 2);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, idx * 45, time, v);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x + Math.cos(ang) * len, c.y + Math.sin(ang) * len);
    ctx.stroke();
  });
}`
      }
    ]
  },

  // R: Radial Sunburst
  {
    key: 'R',
    name: 'Radial Sunburst',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '极速旋转太阳神光轮与光芒扇叶',
    variants: [
      {
        id: 'var1',
        name: '16-Ray Sun Wheel',
        desc: '经典16扇叶太阳神旋转放射光轮',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 4);
  ctx.fillStyle = utils.getStyleColor(\`rgba(255, 220, 0, \${p * 0.35})\`, p * 0.35, 45, time, v);
  const rays = 16;
  const step = (Math.PI * 2) / rays;
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim, i * step, (i + 1) * step);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'High Density 32-Ray Strobe',
        desc: '32 扇叶高密极速频闪光翼',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 6);
  ctx.fillStyle = utils.getStyleColor(\`rgba(0, 240, 255, \${p * 0.4})\`, p * 0.4, 190, time, v);
  const rays = 32;
  const step = (Math.PI * 2) / rays;
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim, i * step, (i + 1) * step);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Volumetric God Rays',
        desc: '带柔和透明度渐变穿透雾气的耶稣光束',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const ang = (i / rays) * Math.PI * 2;
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, maxDim * 0.7);
    grad.addColorStop(0, utils.getStyleColor('rgba(255, 255, 255, 0.9)', p * 0.9, i * 20, time, v));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim * 0.7, ang - 0.12, ang + 0.12);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Dual Counter-Rotating Moiré',
        desc: '双层反向对转产生的莫尔条纹干涉光晕',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  // Layer 1
  ctx.save();
  ctx.rotate(time * 3);
  ctx.fillStyle = utils.getStyleColor(\`rgba(255, 0, 128, \${p * 0.25})\`, p * 0.25, 0, time, v);
  const rays = 24;
  const step = (Math.PI * 2) / rays;
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, maxDim, i * step, (i + 1) * step); ctx.fill();
  }
  ctx.restore();
  // Layer 2
  ctx.save();
  ctx.rotate(-time * 3);
  ctx.fillStyle = utils.getStyleColor(\`rgba(0, 255, 200, \${p * 0.25})\`, p * 0.25, 180, time, v);
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, maxDim, i * step, (i + 1) * step); ctx.fill();
  }
  ctx.restore();
  ctx.restore();
}`
      }
    ]
  },

  // S: Super Shutter
  {
    key: 'S',
    name: 'Super Shutter',
    bank: 'flash',
    bankTitle: '⚡ BANK 1: FLASH & STROBE 爆闪与快门',
    desc: '经典黑白 30Hz 快门切片与断头台硬切',
    variants: [
      {
        id: 'var1',
        name: 'Full Screen Shutter Cut',
        desc: '30Hz 高频极速全屏硬切断电快门',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  const shutterRate = 180 * speed;
  if (Math.sin(time * shutterRate) > 0) {
    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = \`rgba(255, 255, 255, \${p})\`;
    ctx.fillRect(0, 0, w, h);
  }
}`
      },
      {
        id: 'var2',
        name: 'Split Top-Bottom Alternate',
        desc: '上下半屏高速交替爆闪快门',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const isTop = Math.sin(time * 140 * speed) > 0;
  ctx.fillStyle = \`rgba(255, 255, 255, \${p})\`;
  if (isTop) {
    ctx.fillRect(0, 0, w, h * 0.5);
  } else {
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
  }
}`
      },
      {
        id: 'var3',
        name: 'Four Quadrant Rotary Shutter',
        desc: '四象限逆时针极速轮转闪烁快门',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const quad = Math.floor(time * 40 * speed) % 4;
  ctx.fillStyle = \`rgba(255, 255, 255, \${p})\`;
  if (quad === 0) ctx.fillRect(0, 0, cx, cy);
  else if (quad === 1) ctx.fillRect(cx, 0, cx, cy);
  else if (quad === 2) ctx.fillRect(cx, cy, cx, cy);
  else if (quad === 3) ctx.fillRect(0, cy, cx, cy);
}`
      },
      {
        id: 'var4',
        name: 'Guillotine Vertical Slam',
        desc: '断头台闸门极速下砸反弹快门',
        code: `(ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const slam = Math.pow(Math.sin(time * 30 * speed) * 0.5 + 0.5, 4);
  const gateH = slam * h;
  ctx.fillStyle = \`rgba(255, 255, 255, \${p})\`;
  ctx.fillRect(0, 0, w, gateH);
}`
      }
    ]
  },

  // T: Target Cyber HUD
  {
    key: 'T',
    name: 'Target Reticle',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '旋转战术锁定 HUD 准星与多轴标尺',
    variants: [
      {
        id: 'var1',
        name: 'Circle & Rotating Square HUD',
        desc: '经典准星圆环与反向旋转方框',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 136, 0.85)', p * 0.85, 120, time, v);
  ctx.lineWidth = 2 * p;
  ctx.beginPath();
  ctx.arc(0, 0, 160 * p, 0, Math.PI * 2);
  ctx.stroke();
  ctx.rotate(-time * 3);
  ctx.strokeRect(-110 * p, -110 * p, 220 * p, 220 * p);
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Hex Lock Tactical Reticle',
        desc: '蜂窝锁定战术角度刻度标尺',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 100, 0.9)', p * 0.9, 0, time, v);
  utils.drawPolygon(ctx, 0, 0, 150 * p, 6, time * 2);
  ctx.stroke();

  // Tick marks
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + time;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 160 * p, Math.sin(a) * 160 * p);
    ctx.lineTo(Math.cos(a) * 180 * p, Math.sin(a) * 180 * p);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Dual Gimbal Rangefinder',
        desc: '双万向测距仪刻度圈旋转联动',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.0 * p;
  // Inner ring
  ctx.save();
  ctx.rotate(time * 4);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p * 0.9, 180, time, v);
  ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.arc(0, 0, 100 * p, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  // Outer ring
  ctx.save();
  ctx.rotate(-time * 2.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.9)', p * 0.9, 60, time, v);
  ctx.setLineDash([25, 15]);
  ctx.beginPath(); ctx.arc(0, 0, 180 * p, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Missile Target Lock Brackets',
        desc: '导弹四角锁定框极速合拢脉冲',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 60, 0.95)', p * 0.95, 0, time, v);
  const sz = (Math.sin(time * 12) * 0.2 + 0.8) * 120 * p;
  const bL = 35 * p;
  // Brackets
  ctx.beginPath();
  ctx.moveTo(-sz, -sz + bL); ctx.lineTo(-sz, -sz); ctx.lineTo(-sz + bL, -sz);
  ctx.moveTo(sz - bL, -sz); ctx.lineTo(sz, -sz); ctx.lineTo(sz, -sz + bL);
  ctx.moveTo(sz, sz - bL); ctx.lineTo(sz, sz); ctx.lineTo(sz - bL, sz);
  ctx.moveTo(-sz + bL, sz); ctx.lineTo(-sz, sz); ctx.lineTo(-sz, sz - bL);
  ctx.stroke();
  ctx.restore();
}`
      }
    ]
  },

  // U: Ultra Horizon
  {
    key: 'U',
    name: 'Ultra Horizon',
    bank: 'synthwave',
    bankTitle: '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线',
    desc: '合成波夕阳日出地平线与巨大光芒',
    variants: [
      {
        id: 'var1',
        name: 'Classic Synth Sun Glow',
        desc: '经典地平线赛博霓虹日出日落辉光',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, maxDim, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = 'lighter';
  const sunG = ctx.createRadialGradient(cx, h * 0.6, 10, cx, h * 0.6, maxDim * 0.45);
  if (v === 2) {
    sunG.addColorStop(0, \`hsla(\${(time * 100) % 360}, 100%, 70%, \${p * 0.9})\`);
    sunG.addColorStop(0.35, \`hsla(\${(time * 100 + 60) % 360}, 100%, 50%, \${p * 0.7})\`);
  } else {
    sunG.addColorStop(0, \`rgba(255, 255, 200, \${p * 0.9})\`);
    sunG.addColorStop(0.35, \`rgba(255, 0, 128, \${p * 0.7})\`);
  }
  sunG.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sunG;
  ctx.fillRect(0, 0, w, h);
}`
      },
      {
        id: 'var2',
        name: 'Segmented Blind Sun',
        desc: '横向切片百叶条纹赛博巨日',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const sunY = h * 0.55;
  const sunR = 160 * p;
  const strips = 14;
  for (let i = 0; i < strips; i++) {
    const yOff = (i / strips) * (sunR * 2) - sunR;
    const curY = sunY + yOff;
    const stripH = (i / strips) * 8 + 4;
    const chord = Math.sqrt(Math.max(0, sunR * sunR - yOff * yOff));
    if (chord > 0) {
      ctx.fillStyle = utils.getStyleColor('rgba(255, 80, 0, 0.9)', p * 0.9, i * 15, time, v);
      ctx.fillRect(cx - chord, curY, chord * 2, stripH);
    }
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Neon Dawn Horizon Laser',
        desc: '纯平地平线极强激光刃与上下双色辉光',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const horizY = h * 0.58;
  // Laser line
  ctx.fillStyle = utils.getStyleColor('rgba(255, 255, 255, 0.95)', p * 0.95, 0, time, v);
  ctx.fillRect(0, horizY - 3 * p, w, 6 * p);
  // Sky glow
  const skyG = ctx.createLinearGradient(0, horizY - 200, 0, horizY);
  skyG.addColorStop(0, 'rgba(0,0,0,0)');
  skyG.addColorStop(1, utils.getStyleColor('rgba(255, 0, 150, 0.6)', p * 0.6, 300, time, v));
  ctx.fillStyle = skyG;
  ctx.fillRect(0, horizY - 200, w, 200);
}`
      },
      {
        id: 'var4',
        name: 'Total Solar Eclipse Corona',
        desc: '黑洞日全食边缘耀斑与环形喷流',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const coronaR = 140 * p;
  const grad = ctx.createRadialGradient(cx, cy, coronaR * 0.8, cx, cy, coronaR * 1.6);
  grad.addColorStop(0, utils.getStyleColor('rgba(255, 240, 200, 0.95)', p * 0.95, 0, time, v));
  grad.addColorStop(0.5, utils.getStyleColor('rgba(0, 240, 255, 0.6)', p * 0.6, 180, time, v));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // Dark core
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, coronaR * 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}`
      }
    ]
  },

  // V: Vortex Swirl
  {
    key: 'V',
    name: 'Vortex Swirl',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '阿基米德光速螺旋漩涡与黑洞吸积盘',
    variants: [
      {
        id: 'var1',
        name: 'Archimedean 4-Arm Spiral',
        desc: '经典四臂阿基米德旋转吸入螺旋',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 5);
  ctx.strokeStyle = utils.getStyleColor('rgba(160, 0, 255, 0.9)', p * 0.9, 270, time, v);
  ctx.lineWidth = 3.0 * p;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.15) {
    const rad = a * 18 * p;
    const vx = Math.cos(a) * rad;
    const vy = Math.sin(a) * rad;
    if (a === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
  }
  ctx.stroke();
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Black Hole Accretion Disk',
        desc: '黑洞吸积盘引力透镜双向旋转光环',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const arms = 6;
  ctx.lineWidth = 2.5 * p;
  for (let i = 0; i < arms; i++) {
    const baseA = (i / arms) * Math.PI * 2 + time * 4;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 100, 0, 0.85)', p * 0.85, i * 40, time, v);
    ctx.beginPath();
    for (let s = 10; s < 300; s += 10) {
      const a = baseA + s * 0.02;
      const x = Math.cos(a) * s * p;
      const y = Math.sin(a) * s * p;
      if (s === 10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Double Helix DNA Swirl',
        desc: 'DNA 双螺旋交织向内塌缩',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 3);
  ctx.lineWidth = 3.0 * p;
  for (let h = 0; h < 2; h++) {
    const offsetA = h * Math.PI;
    ctx.strokeStyle = utils.getStyleColor(h === 0 ? 'rgba(0, 240, 255, 0.9)' : 'rgba(255, 0, 180, 0.9)', p * 0.9, h * 180, time, v);
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 6; a += 0.12) {
      const r = Math.pow(a, 1.4) * 16 * p;
      const x = Math.cos(a + offsetA) * r;
      const y = Math.sin(a + offsetA) * r;
      if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Logarithmic Warp Spiral',
        desc: '对数极速扭曲时空隧道螺旋线',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 8);
  ctx.lineWidth = 2.0 * p;
  const rays = 8;
  for (let r = 0; r < rays; r++) {
    const startA = (r / rays) * Math.PI * 2;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 140, 0.8)', p * 0.8, r * 30, time, v);
    ctx.beginPath();
    for (let step = 0; step < 50; step++) {
      const rad = Math.exp(step * 0.12) * 2 * p;
      const a = startA + step * 0.15;
      const x = Math.cos(a) * rad;
      const y = Math.sin(a) * rad;
      if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}`
      }
    ]
  },

  // W: Warp Speed Starfield
  {
    key: 'W',
    name: 'Warp Speed',
    bank: 'chaos',
    bankTitle: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    desc: '星际穿越光速拉伸星光与曲率飞行',
    variants: [
      {
        id: 'var1',
        name: 'Relativistic Star Streaks',
        desc: '经典千隼号超空间光速拉伸光束',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const stars = 60;
  for (let s = 0; s < stars; s++) {
    const ang = (s / stars) * Math.PI * 2;
    const speedProg = ((s / stars + time * 1.2) % 1);
    const len1 = speedProg * maxDim * 0.6;
    const len2 = len1 + speedProg * 140;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.85)', p * 0.85, s * 8, time, v);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * len1, cy + Math.sin(ang) * len1);
    ctx.lineTo(cx + Math.cos(ang) * len2, cy + Math.sin(ang) * len2);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var2',
        name: 'Hyperspace Cylinder Grid',
        desc: '曲率圆柱形隧道网格极速冲刺',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.8);
  ctx.lineWidth = 2.0 * p;
  const spokes = 16;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.7)', p * 0.7, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * maxDim * 0.8, Math.sin(a) * maxDim * 0.8);
    ctx.stroke();
  }
  const rings = 8;
  for (let r = 0; r < rings; r++) {
    const prog = Math.pow(((r / rings + time * 1.5) % 1), 2.5);
    const rad = prog * maxDim * 0.8;
    ctx.strokeStyle = utils.getStyleColor(\`rgba(255, 0, 150, \${p * (1 - prog)})\`, p * (1 - prog), r * 30, time, v);
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Cosmic Particle Swarm',
        desc: '星际粒子风暴迎面漫天扑来',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const count = 80;
  for (let i = 0; i < count; i++) {
    const ang = (i * 2.399) + time * 0.5;
    const prog = ((i / count + time * 1.4) % 1);
    const dist = Math.pow(prog, 2) * maxDim * 0.75;
    const sz = prog * 8 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 240, 180, 0.9)', p * 0.9, i * 10, time, v);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}`
      },
      {
        id: 'var4',
        name: 'Quantum Warp Streaks',
        desc: '色相分离量子加速条纹',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2 + Math.sin(time * 2 + i) * 0.2;
    const prog = ((i / count + time * 2.0) % 1);
    const l1 = prog * maxDim * 0.5;
    const l2 = l1 + prog * 180;
    ctx.strokeStyle = utils.getStyleColor(\`hsla(\${(i * 15 + time * 200) % 360}, 100%, 70%, \${p * 0.9})\`, p * 0.9, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * l1, cy + Math.sin(ang) * l1);
    ctx.lineTo(cx + Math.cos(ang) * l2, cy + Math.sin(ang) * l2);
    ctx.stroke();
  }
}`
      }
    ]
  },

  // X: X-Ray Blade
  {
    key: 'X',
    name: 'X-Ray Blade',
    bank: 'lasers',
    bankTitle: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    desc: '对角交错反色光刃与剪刀切割',
    variants: [
      {
        id: 'var1',
        name: 'Full Diagonal X-Blades',
        desc: '经典对角反色巨剑激光硬核切割',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.lineWidth = (Math.sin(time * 15) * 6 + 10) * p;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(w, h);
  ctx.moveTo(w, 0); ctx.lineTo(0, h);
  ctx.stroke();
}`
      },
      {
        id: 'var2',
        name: 'Scissor Chopper Blades',
        desc: '上下剪刀式高速开合切割激光刀',
        code: `(ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.lineWidth = 6 * p;
  ctx.strokeStyle = '#ffffff';
  const ang = Math.sin(time * 12) * 0.45;
  ctx.beginPath();
  // Blade 1
  ctx.moveTo(0, cy - Math.sin(ang) * cy); ctx.lineTo(w, cy + Math.sin(ang) * cy);
  // Blade 2
  ctx.moveTo(0, cy + Math.sin(ang) * cy); ctx.lineTo(w, cy - Math.sin(ang) * cy);
  ctx.stroke();
}`
      },
      {
        id: 'var3',
        name: 'Multi Diagonal X-Mesh Grid',
        desc: '多组平行对角线组成的菱形光刃网',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = '#ffffff';
  const count = 6;
  const offset = (time * 200) % 100;
  for (let i = -count; i <= count; i++) {
    const shift = i * 150 + offset;
    ctx.beginPath();
    ctx.moveTo(shift, 0); ctx.lineTo(shift + w, h);
    ctx.moveTo(w - shift, 0); ctx.lineTo(-shift, h);
    ctx.stroke();
  }
}`
      },
      {
        id: 'var4',
        name: 'Rotating Giant X-Blade',
        desc: '全屏中心自转双刃极速绞杀刀',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'difference';
  ctx.translate(cx, cy);
  ctx.rotate(time * 6);
  ctx.lineWidth = 12 * p;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-maxDim, -maxDim); ctx.lineTo(maxDim, maxDim);
  ctx.moveTo(maxDim, -maxDim); ctx.lineTo(-maxDim, maxDim);
  ctx.stroke();
  ctx.restore();
}`
      }
    ]
  },

  // Y: Y-Equalizer
  {
    key: 'Y',
    name: 'Y-Axis EQ',
    bank: 'synthwave',
    bankTitle: '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线',
    desc: '舞池跳动 EQ 电平频谱与立体声柱',
    variants: [
      {
        id: 'var1',
        name: 'Stage Floor VU Columns',
        desc: '底部32路均衡器电平跳动频谱柱',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 32;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.4 + time * 20) * 0.5 + 0.5) * h * 0.65 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 235, 0, 0.85)', p * 0.85, i * 15, time, v);
    ctx.fillRect(i * colW + 2, h - barH, colW - 4, barH);
  }
}`
      },
      {
        id: 'var2',
        name: 'Radial Circular Equalizer',
        desc: '360° 环形向外跳动的重低音电平圈',
        code: `(ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const cols = 48;
  for (let i = 0; i < cols; i++) {
    const ang = (i / cols) * Math.PI * 2;
    const barLen = (Math.sin(i * 0.4 + time * 20) * 0.5 + 0.5) * 140 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 235, 0, 0.85)', p * 0.85, i * 10, time, v);
    ctx.lineWidth = 4 * p;
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * 60, Math.sin(ang) * 60);
    ctx.lineTo(Math.cos(ang) * (60 + barLen), Math.sin(ang) * (60 + barLen));
    ctx.stroke();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Ceiling & Floor Mirrored EQ',
        desc: '天花板与地板上下对称对轰频谱柱',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 28;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.5 + time * 18) * 0.5 + 0.5) * h * 0.35 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 20, time, v);
    // Bottom
    ctx.fillRect(i * colW + 2, h - barH, colW - 4, barH);
    // Top
    ctx.fillRect(i * colW + 2, 0, colW - 4, barH);
  }
}`
      },
      {
        id: 'var4',
        name: 'Center Outward EQ Bars',
        desc: '屏幕中央水平线向上下双向爆发频谱',
        code: `(ctx, state) => {
  const { width: w, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 36;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.35 + time * 22) * 0.5 + 0.5) * 160 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, i * 12, time, v);
    ctx.fillRect(i * colW + 2, cy - barH * 0.5, colW - 4, barH);
  }
}`
      }
    ]
  },

  // Z: Zenith Shard Orbit
  {
    key: 'Z',
    name: 'Zenith Shards',
    bank: 'geometry',
    bankTitle: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    desc: '多边形水晶几何环绕与晶体折射',
    variants: [
      {
        id: 'var1',
        name: 'Orbiting Crystal Shards',
        desc: '经典多边形水晶碎片同心环绕',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 2.5);
  const shards = 20;
  for (let k = 0; k < shards; k++) {
    const ang = (k / shards) * Math.PI * 2;
    const dist = (Math.sin(time * 6 + k) * 0.15 + 0.85) * (maxDim * 0.35);
    const sx = Math.cos(ang) * dist;
    const sy = Math.sin(ang) * dist;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.8)', p * 0.8, k * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(sx, sy - 15 * p);
    ctx.lineTo(sx + 12 * p, sy + 12 * p);
    ctx.lineTo(sx - 12 * p, sy + 12 * p);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}`
      },
      {
        id: 'var2',
        name: 'Cascading Crystal Rain',
        desc: '向下飘落翻滚折射的水晶雨',
        code: `(ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const shards = 28;
  for (let i = 0; i < shards; i++) {
    const x = ((i * 187) % w);
    const y = (time * 250 + i * 40) % (h + 80) - 40;
    const rot = time * 4 + i;
    const sz = 16 * p;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 20, time, v);
    ctx.lineWidth = 2 * p;
    utils.drawPolygon(ctx, 0, 0, sz, 4);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}`
      },
      {
        id: 'var3',
        name: 'Shattered Glass Explosion',
        desc: '中心向外爆炸飞溅的高能玻璃晶片',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const count = 30;
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2;
    const prog = ((i / count + time * 1.5) % 1);
    const dist = prog * maxDim * 0.65;
    const x = Math.cos(ang) * dist;
    const y = Math.sin(ang) * dist;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(time * 5 + i);
    ctx.fillStyle = utils.getStyleColor(\`rgba(255, 230, 0, \${p * (1 - prog)})\`, p * (1 - prog), i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(0, -18 * p); ctx.lineTo(10 * p, 10 * p); ctx.lineTo(-10 * p, 10 * p);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}`
      },
      {
        id: 'var4',
        name: 'Dual Crystal Crowns',
        desc: '双层反向环绕的钻石王冠棱镜',
        code: `(ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.0 * p;
  // Outer crown
  ctx.save();
  ctx.rotate(time * 2);
  const count1 = 16;
  const r1 = maxDim * 0.3 * p;
  for (let i = 0; i < count1; i++) {
    const a = (i / count1) * Math.PI * 2;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 220, 0.8)', p * 0.8, i * 25, time, v);
    utils.drawPolygon(ctx, Math.cos(a) * r1, Math.sin(a) * r1, 14 * p, 3, a);
    ctx.fill();
  }
  ctx.restore();
  // Inner crown
  ctx.save();
  ctx.rotate(-time * 2.5);
  const count2 = 12;
  const r2 = maxDim * 0.18 * p;
  for (let i = 0; i < count2; i++) {
    const a = (i / count2) * Math.PI * 2;
    ctx.fillStyle = utils.getStyleColor('rgba(0, 255, 180, 0.85)', p * 0.85, i * 30, time, v);
    utils.drawPolygon(ctx, Math.cos(a) * r2, Math.sin(a) * r2, 10 * p, 4, a);
    ctx.fill();
  }
  ctx.restore();
  ctx.restore();
}`
      }
    ]
  }
];

// Generate files for each plugin
for (const plug of pluginsData) {
  const plugDir = path.join(PLUGINS_DIR, plug.key);
  if (!fs.existsSync(plugDir)) {
    fs.mkdirSync(plugDir, { recursive: true });
  }

  // 1. Write variant1.js, variant2.js, variant3.js, variant4.js
  plug.variants.forEach((v, idx) => {
    const varNum = idx + 1;
    const vContent = `/**
 * Plugin ${plug.key} - Variant ${varNum}: ${v.name}
 * ${v.desc}
 */

export const id = '${v.id}';
export const name = '${v.name.replace(/'/g, "\\'")}';
export const desc = '${v.desc.replace(/'/g, "\\'")}';

export const render = ${v.code};
`;
    fs.writeFileSync(path.join(plugDir, `variant${varNum}.js`), vContent);
  });

  // 2. Write plugins/[Key]/index.js
  const plugIndexContent = `/**
 * Plugin ${plug.key}: ${plug.name}
 * Bank: ${plug.bank}
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = '${plug.key}';
export const name = '${plug.name.replace(/'/g, "\\'")}';
export const bank = '${plug.bank}';
export const bankTitle = '${plug.bankTitle.replace(/'/g, "\\'")}';
export const desc = '${plug.desc.replace(/'/g, "\\'")}';

export const variants = [
  variant1,
  variant2,
  variant3,
  variant4
];

export function render(ctx, state, variantIdx = 0) {
  const v = variants[variantIdx % variants.length];
  if (v && v.render) {
    v.render(ctx, state);
  }
}
`;
  fs.writeFileSync(path.join(plugDir, 'index.js'), plugIndexContent);
  console.log(`Generated plugin ${plug.key} with ${plug.variants.length} variants.`);
}

// 3. Write plugins/index.js (Master Registry)
const letters = pluginsData.map(p => p.key);
const masterRegistry = `/**
 * MASTER PLUGIN REGISTRY (A to Z)
 * Auto-generated by build-plugins.js
 */
import * as utils from './utils.js';

${letters.map(c => `import * as plugin${c} from './${c}/index.js';`).join('\n')}

export const plugins = {
${letters.map(c => `  '${c}': plugin${c},`).join('\n')}
};

export const pluginList = [
${letters.map(c => `  plugin${c},`).join('\n')}
];

export { utils };

// Group by Banks for VJ Console UI
export const bankGroups = [
  {
    id: 'flash',
    title: '⚡ BANK 1: FLASH & STROBE 爆闪与快门',
    plugins: ['A', 'S', 'J', 'G'].map(k => plugins[k])
  },
  {
    id: 'lasers',
    title: '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃',
    plugins: ['B', 'C', 'F', 'L', 'Q', 'X'].map(k => plugins[k])
  },
  {
    id: 'geometry',
    title: '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道',
    plugins: ['D', 'H', 'I', 'K', 'V', 'Z'].map(k => plugins[k])
  },
  {
    id: 'synthwave',
    title: '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线',
    plugins: ['M', 'U', 'Y', 'P'].map(k => plugins[k])
  },
  {
    id: 'chaos',
    title: '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场',
    plugins: ['E', 'N', 'O', 'R', 'T', 'W'].map(k => plugins[k])
  }
];
`;

fs.writeFileSync(path.join(PLUGINS_DIR, 'index.js'), masterRegistry);
console.log('Master plugins/index.js registry created successfully!');
