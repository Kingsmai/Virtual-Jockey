/**
 * Plugin X - Variant 1: Full Diagonal X-Blades
 * 经典对角反色巨剑激光硬核切割
 */

export const id = 'var1';
export const name = 'Full Diagonal X-Blades';
export const desc = '经典对角反色巨剑激光硬核切割';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.lineWidth = (Math.sin(time * 15) * 6 + 10) * p;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(w, h);
  ctx.moveTo(w, 0); ctx.lineTo(0, h);
  ctx.stroke();
};
