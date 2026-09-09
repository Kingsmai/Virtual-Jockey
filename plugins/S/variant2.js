/**
 * Plugin S - Variant 2: Split Top-Bottom Alternate
 * 上下半屏高速交替爆闪快门
 */

export const id = 'var2';
export const name = 'Split Top-Bottom Alternate';
export const desc = '上下半屏高速交替爆闪快门';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const isTop = Math.sin(time * 140 * speed) > 0;
  ctx.fillStyle = `rgba(255, 255, 255, ${p})`;
  if (isTop) {
    ctx.fillRect(0, 0, w, h * 0.5);
  } else {
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
  }
};
