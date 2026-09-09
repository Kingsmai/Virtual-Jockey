/**
 * Plugin O - Variant 4: Nested Gyro Spheres
 * 多层同心旋转球体经纬骨架
 */

export const id = 'var4';
export const name = 'Nested Gyro Spheres';
export const desc = '多层同心旋转球体经纬骨架';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.2 * p;
  const spheres = 3;
  for (let s = 1; s <= spheres; s++) {
    const r = s * 75 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 180, 0.75)', p * 0.75, s * 50, time, v);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * Math.sin(time * 2 + s), time * s, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();
};
