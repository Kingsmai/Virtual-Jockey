/**
 * Plugin S - Variant 3: Four Quadrant Rotary Shutter
 * 四象限逆时针极速轮转闪烁快门
 */

export const id = 'var3';
export const name = 'Four Quadrant Rotary Shutter';
export const desc = '四象限逆时针极速轮转闪烁快门';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const quad = Math.floor(time * 40 * speed) % 4;
  ctx.fillStyle = `rgba(255, 255, 255, ${p})`;
  if (quad === 0) ctx.fillRect(0, 0, cx, cy);
  else if (quad === 1) ctx.fillRect(cx, 0, cx, cy);
  else if (quad === 2) ctx.fillRect(cx, cy, cx, cy);
  else if (quad === 3) ctx.fillRect(0, cy, cx, cy);
};
