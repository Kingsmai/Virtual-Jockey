/**
 * Plugin N - Variant 1: Optical Flare Cross
 * 经典八向光学耀斑旋转脉冲
 */

export const id = 'var1';
export const name = 'Optical Flare Cross';
export const desc = '经典八向光学耀斑旋转脉冲';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  const pulse = (Math.sin(time * 10) * 0.2 + 0.8) * p;
  ctx.fillStyle = utils.getStyleColor(`rgba(255, 255, 255, ${pulse * 0.9})`, pulse * 0.9, 0, time, v);
  ctx.beginPath();
  ctx.ellipse(0, 0, maxDim * 0.6, 3.5 * p, 0, 0, Math.PI * 2);
  ctx.ellipse(0, 0, 3.5 * p, maxDim * 0.6, 0, 0, Math.PI * 2);
  ctx.ellipse(0, 0, maxDim * 0.4, 2 * p, Math.PI / 4, 0, Math.PI * 2);
  ctx.ellipse(0, 0, 2 * p, maxDim * 0.4, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
