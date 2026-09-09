/**
 * Plugin K - Variant 2: Flower of Life Hexa
 * 十二瓣神圣生命之花向外绽放
 */

export const id = 'var2';
export const name = 'Flower of Life Hexa';
export const desc = '十二瓣神圣生命之花向外绽放';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 1.5);
  ctx.lineWidth = 2.0 * p;
  const petals = 12;
  const rad = 130 * p;
  for (let i = 0; i < petals; i++) {
    const ang = (i / petals) * Math.PI * 2;
    const px = Math.cos(ang) * rad;
    const py = Math.sin(ang) * rad;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 200, 0.8)', p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};
