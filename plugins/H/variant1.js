/**
 * Plugin H - Variant 1: Concentric Hex Rings
 * 旋转同心六边形能量波向外扩散
 */

export const id = 'var1';
export const name = 'Concentric Hex Rings';
export const desc = '旋转同心六边形能量波向外扩散';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.5);
  ctx.lineWidth = 3.5 * p;
  const rings = 5;
  for (let ring = 1; ring <= rings; ring++) {
    const rad = ((ring / rings + time * 0.4) % 1) * maxDim * 0.6;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p})`, p * (1 - rad / (maxDim * 0.6)), ring * 45, time, v);
    utils.drawPolygon(ctx, 0, 0, rad, 6);
    ctx.stroke();
  }
  ctx.restore();
};
