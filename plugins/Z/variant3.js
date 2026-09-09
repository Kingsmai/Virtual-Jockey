/**
 * Plugin Z - Variant 3: Shattered Glass Explosion
 * 中心向外爆炸飞溅的高能玻璃晶片
 */

export const id = 'var3';
export const name = 'Shattered Glass Explosion';
export const desc = '中心向外爆炸飞溅的高能玻璃晶片';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const count = 30;
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2;
    const prog = ((i / count + time * 1.5) % 1);
    const dist = prog * maxDim * 0.65;
    const x = Math.cos(ang) * dist;
    const y = Math.sin(ang) * dist;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(time * 5 + i);
    ctx.fillStyle = utils.getStyleColor(`rgba(255, 230, 0, ${p * (1 - prog)})`, p * (1 - prog), i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(0, -18 * p); ctx.lineTo(10 * p, 10 * p); ctx.lineTo(-10 * p, 10 * p);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
};
