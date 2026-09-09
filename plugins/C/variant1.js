/**
 * Plugin C - Variant 1: Single Rotary Cross
 * 经典全屏旋转高能十字光刃
 */

export const id = 'var1';
export const name = 'Single Rotary Cross';
export const desc = '经典全屏旋转高能十字光刃';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2.5);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 80, 0.9)', p, 0, time, v);
  ctx.fillRect(-maxDim, -4 * p, maxDim * 2, 8 * p);
  ctx.fillRect(-4 * p, -maxDim, 8 * p, maxDim * 2);
  ctx.restore();
};
