/**
 * Plugin Z - Variant 1: Orbiting Crystal Shards
 * 经典多边形水晶碎片同心环绕
 */

export const id = 'var1';
export const name = 'Orbiting Crystal Shards';
export const desc = '经典多边形水晶碎片同心环绕';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 2.5);
  const shards = 20;
  for (let k = 0; k < shards; k++) {
    const ang = (k / shards) * Math.PI * 2;
    const dist = (Math.sin(time * 6 + k) * 0.15 + 0.85) * (maxDim * 0.35);
    const sx = Math.cos(ang) * dist;
    const sy = Math.sin(ang) * dist;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.8)', p * 0.8, k * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(sx, sy - 15 * p);
    ctx.lineTo(sx + 12 * p, sy + 12 * p);
    ctx.lineTo(sx - 12 * p, sy + 12 * p);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
};
