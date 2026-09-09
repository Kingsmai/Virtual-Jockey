/**
 * Plugin N - Variant 3: Pulsar Relativistic Jets
 * 脉冲星两极喷射极速自转等离子流
 */

export const id = 'var3';
export const name = 'Pulsar Relativistic Jets';
export const desc = '脉冲星两极喷射极速自转等离子流';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 6);
  ctx.lineWidth = 4 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.95)', p * 0.95, 190, time, v);
  // Jets
  ctx.beginPath();
  ctx.moveTo(0, -maxDim * 0.7);
  ctx.lineTo(0, maxDim * 0.7);
  ctx.stroke();
  // Beam fan
  for (let j = -2; j <= 2; j++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 200, 0.6)', p * 0.6, j * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(j * 40, -maxDim * 0.7);
    ctx.moveTo(0, 0); ctx.lineTo(-j * 40, maxDim * 0.7);
    ctx.stroke();
  }
  ctx.restore();
};
