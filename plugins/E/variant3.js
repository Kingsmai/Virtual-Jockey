/**
 * Plugin E - Variant 3: Radial Plasma Ball
 * 中心等离子球体向外喷射混乱等离子
 */

export const id = 'var3';
export const name = 'Radial Plasma Ball';
export const desc = '中心等离子球体向外喷射混乱等离子';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const rays = 16;
  for (let i = 0; i < rays; i++) {
    const baseAng = (i / rays) * Math.PI * 2 + time * 3;
    const len = 250 * p + Math.sin(time * 20 + i) * 80 * p;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 0, 180, ${p * 0.85})`, p * 0.85, i * 20, time, v);
    ctx.lineWidth = (Math.random() * 2 + 1.5) * p;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    let segs = 8;
    for (let s = 1; s <= segs; s++) {
      const r = (s / segs) * len;
      const a = baseAng + (Math.sin(s * 2 + time * 30) * 0.25);
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.stroke();
  }
  ctx.restore();
};
