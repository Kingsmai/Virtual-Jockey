/**
 * Plugin R - Variant 1: 16-Ray Sun Wheel
 * 经典16扇叶太阳神旋转放射光轮
 */

export const id = 'var1';
export const name = '16-Ray Sun Wheel';
export const desc = '经典16扇叶太阳神旋转放射光轮';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 4);
  ctx.fillStyle = utils.getStyleColor(`rgba(255, 220, 0, ${p * 0.35})`, p * 0.35, 45, time, v);
  const rays = 16;
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
