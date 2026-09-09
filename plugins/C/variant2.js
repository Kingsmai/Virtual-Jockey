/**
 * Plugin C - Variant 2: Octo Star Blades
 * 八向双层极速对转激光十字光剑
 */

export const id = 'var2';
export const name = 'Octo Star Blades';
export const desc = '八向双层极速对转激光十字光剑';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.translate(cx, cy);
  // Layer 1
  ctx.save();
  ctx.rotate(time * 4.0);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p, 0, time, v);
  ctx.fillRect(-maxDim, -3 * p, maxDim * 2, 6 * p);
  ctx.fillRect(-3 * p, -maxDim, 6 * p, maxDim * 2);
  ctx.restore();
  // Layer 2
  ctx.save();
  ctx.rotate(-time * 3.0 + Math.PI / 4);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p, 180, time, v);
  ctx.fillRect(-maxDim, -2 * p, maxDim * 2, 4 * p);
  ctx.fillRect(-2 * p, -maxDim, 4 * p, maxDim * 2);
  ctx.restore();
  ctx.restore();
};
