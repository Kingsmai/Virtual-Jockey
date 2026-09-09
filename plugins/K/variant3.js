/**
 * Plugin K - Variant 3: Crystalline Geometric Shards
 * 八角锐利水晶折纸万花筒
 */

export const id = 'var3';
export const name = 'Crystalline Geometric Shards';
export const desc = '八角锐利水晶折纸万花筒';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2.5);
  ctx.lineWidth = 2.5 * p;
  const arms = 8;
  const sz = 180 * p;
  for (let i = 0; i < arms; i++) {
    ctx.rotate((Math.PI * 2) / arms);
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 35, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(sz * 0.7, sz * 0.3);
    ctx.lineTo(sz, 0);
    ctx.lineTo(sz * 0.7, -sz * 0.3);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
};
