/**
 * Plugin R - Variant 2: High Density 32-Ray Strobe
 * 32 扇叶高密极速频闪光翼
 */

export const id = 'var2';
export const name = 'High Density 32-Ray Strobe';
export const desc = '32 扇叶高密极速频闪光翼';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 6);
  ctx.fillStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * 0.4})`, p * 0.4, 190, time, v);
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
};
