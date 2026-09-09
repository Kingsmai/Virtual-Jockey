/**
 * Plugin G - Variant 4: Pixel Block Glitch
 * 随机跳动的像素色块数据损坏矩阵
 */

export const id = 'var4';
export const name = 'Pixel Block Glitch';
export const desc = '随机跳动的像素色块数据损坏矩阵';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const blocks = 14;
  for (let i = 0; i < blocks; i++) {
    const bx = Math.sin(i * 123 + time * 20) * w * 0.5 + w * 0.5;
    const by = Math.cos(i * 456 + time * 20) * h * 0.5 + h * 0.5;
    const bw = (Math.sin(i + time * 10) * 0.5 + 0.5) * 120 + 30;
    const bh = (Math.cos(i + time * 10) * 0.5 + 0.5) * 40 + 10;
    ctx.fillStyle = (i % 2 === 0) ? `rgba(255, 0, 100, ${p * 0.7})` : `rgba(0, 255, 220, ${p * 0.7})`;
    ctx.fillRect(bx - bw * 0.5, by - bh * 0.5, bw, bh);
  }
};
