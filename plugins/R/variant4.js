/**
 * Plugin R - Variant 4: Dual Counter-Rotating Moiré
 * 双层反向对转产生的莫尔条纹干涉光晕
 */

export const id = 'var4';
export const name = 'Dual Counter-Rotating Moiré';
export const desc = '双层反向对转产生的莫尔条纹干涉光晕';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  // Layer 1
  ctx.save();
  ctx.rotate(time * 3);
  ctx.fillStyle = utils.getStyleColor(`rgba(255, 0, 128, ${p * 0.25})`, p * 0.25, 0, time, v);
  const rays = 24;
  const step = (Math.PI * 2) / rays;
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, maxDim, i * step, (i + 1) * step); ctx.fill();
  }
  ctx.restore();
  // Layer 2
  ctx.save();
  ctx.rotate(-time * 3);
  ctx.fillStyle = utils.getStyleColor(`rgba(0, 255, 200, ${p * 0.25})`, p * 0.25, 180, time, v);
  for (let i = 0; i < rays; i += 2) {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, maxDim, i * step, (i + 1) * step); ctx.fill();
  }
  ctx.restore();
  ctx.restore();
};
