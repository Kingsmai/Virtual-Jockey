/**
 * Plugin X - Variant 4: Rotating Giant X-Blade
 * 全屏中心自转双刃极速绞杀刀
 */

export const id = 'var4';
export const name = 'Rotating Giant X-Blade';
export const desc = '全屏中心自转双刃极速绞杀刀';

export const render = (ctx, state) => {
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
};
