/**
 * Plugin I - Variant 1: Circular Shockwaves
 * 超空间圆形冲击波环极速冲脸
 */

export const id = 'var1';
export const name = 'Circular Shockwaves';
export const desc = '超空间圆形冲击波环极速冲脸';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const rings = 8;
  for (let r = 0; r < rings; r++) {
    const prog = (r / rings + time * 0.7) % 1;
    const ringRad = prog * maxDim * 0.75;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 40, 130, ${p})`, p * (1 - prog), r * 30, time, v);
    ctx.beginPath();
    ctx.arc(cx, cy, ringRad, 0, Math.PI * 2);
    ctx.stroke();
  }
};
