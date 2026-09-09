/**
 * Plugin N - Variant 2: Supernova Shockwave
 * 超新星向外爆炸扩散的冲击波与光子
 */

export const id = 'var2';
export const name = 'Supernova Shockwave';
export const desc = '超新星向外爆炸扩散的冲击波与光子';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const prog = (time * 1.5) % 1;
  const shockR = prog * maxDim * 0.6;
  ctx.lineWidth = (1 - prog) * 12 * p;
  ctx.strokeStyle = utils.getStyleColor(`rgba(255, 100, 50, ${p * (1 - prog)})`, p * (1 - prog), 30, time, v);
  ctx.beginPath();
  ctx.arc(cx, cy, shockR, 0, Math.PI * 2);
  ctx.stroke();

  // Core glow
  const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 80 * p);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.5, 'rgba(255,180,0,0.8)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - 80, cy - 80, 160, 160);
  ctx.restore();
};
