/**
 * Plugin U - Variant 4: Total Solar Eclipse Corona
 * 黑洞日全食边缘耀斑与环形喷流
 */

export const id = 'var4';
export const name = 'Total Solar Eclipse Corona';
export const desc = '黑洞日全食边缘耀斑与环形喷流';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const coronaR = 140 * p;
  const grad = ctx.createRadialGradient(cx, cy, coronaR * 0.8, cx, cy, coronaR * 1.6);
  grad.addColorStop(0, utils.getStyleColor('rgba(255, 240, 200, 0.95)', p * 0.95, 0, time, v));
  grad.addColorStop(0.5, utils.getStyleColor('rgba(0, 240, 255, 0.6)', p * 0.6, 180, time, v));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // Dark core
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, coronaR * 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
