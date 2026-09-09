/**
 * Plugin X - Variant 2: Scissor Chopper Blades
 * 上下剪刀式高速开合切割激光刀
 */

export const id = 'var2';
export const name = 'Scissor Chopper Blades';
export const desc = '上下剪刀式高速开合切割激光刀';

export const render = (ctx, state) => {
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
};
