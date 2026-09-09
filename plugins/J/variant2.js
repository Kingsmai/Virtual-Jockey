/**
 * Plugin J - Variant 2: Interlaced Strobe Rows
 * 隔行隔帧交替硬核黑白频闪
 */

export const id = 'var2';
export const name = 'Interlaced Strobe Rows';
export const desc = '隔行隔帧交替硬核黑白频闪';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const rowH = 6;
  const isOdd = Math.sin(time * 120 * speed) > 0;
  ctx.fillStyle = (v === 2) ? `hsla(${(time * 300) % 360}, 100%, 70%, ${p * 0.8})` : `rgba(255, 255, 255, ${p * 0.8})`;
  for (let y = (isOdd ? 0 : rowH); y < h; y += rowH * 2) {
    ctx.fillRect(0, y, w, rowH);
  }
};
