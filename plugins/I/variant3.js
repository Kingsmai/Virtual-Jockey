/**
 * Plugin I - Variant 3: Dashed Target Rings
 * 多层虚线环反向交错高速旋转
 */

export const id = 'var3';
export const name = 'Dashed Target Rings';
export const desc = '多层虚线环反向交错高速旋转';

export const render = (ctx, state) => {
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
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 230, 0, ${p * 0.85})`, p * 0.85, i * 40, time, v);
    ctx.setLineDash([20, 15]);
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
};
