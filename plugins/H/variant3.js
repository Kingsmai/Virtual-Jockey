/**
 * Plugin H - Variant 3: Dual Hexagram Merkabah
 * 双重反向旋转大卫之星能量阵
 */

export const id = 'var3';
export const name = 'Dual Hexagram Merkabah';
export const desc = '双重反向旋转大卫之星能量阵';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.0 * p;
  const sz = maxDim * 0.35 * p;
  // Star 1
  ctx.save();
  ctx.rotate(time * 2);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 120, 0.9)', p * 0.9, 0, time, v);
  utils.drawPolygon(ctx, 0, 0, sz, 3, -Math.PI / 2); ctx.stroke();
  utils.drawPolygon(ctx, 0, 0, sz, 3, Math.PI / 2); ctx.stroke();
  ctx.restore();
  // Star 2
  ctx.save();
  ctx.rotate(-time * 2.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 230, 0.9)', p * 0.9, 180, time, v);
  utils.drawPolygon(ctx, 0, 0, sz * 0.6, 3, -Math.PI / 2); ctx.stroke();
  utils.drawPolygon(ctx, 0, 0, sz * 0.6, 3, Math.PI / 2); ctx.stroke();
  ctx.restore();
  ctx.restore();
};
