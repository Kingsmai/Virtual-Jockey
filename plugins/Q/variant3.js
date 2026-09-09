/**
 * Plugin Q - Variant 3: Dual Crossfire Cannon
 * 对角线交叉横贯全屏重型主炮
 */

export const id = 'var3';
export const name = 'Dual Crossfire Cannon';
export const desc = '对角线交叉横贯全屏重型主炮';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = (Math.sin(time * 30) * 4 + 8) * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.95)', p * 0.95, 50, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(w, h);
  ctx.moveTo(w, 0); ctx.lineTo(0, h);
  ctx.stroke();
};
