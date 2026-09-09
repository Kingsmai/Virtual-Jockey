/**
 * Plugin T - Variant 4: Missile Target Lock Brackets
 * 导弹四角锁定框极速合拢脉冲
 */

export const id = 'var4';
export const name = 'Missile Target Lock Brackets';
export const desc = '导弹四角锁定框极速合拢脉冲';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 60, 0.95)', p * 0.95, 0, time, v);
  const sz = (Math.sin(time * 12) * 0.2 + 0.8) * 120 * p;
  const bL = 35 * p;
  // Brackets
  ctx.beginPath();
  ctx.moveTo(-sz, -sz + bL); ctx.lineTo(-sz, -sz); ctx.lineTo(-sz + bL, -sz);
  ctx.moveTo(sz - bL, -sz); ctx.lineTo(sz, -sz); ctx.lineTo(sz, -sz + bL);
  ctx.moveTo(sz, sz - bL); ctx.lineTo(sz, sz); ctx.lineTo(sz - bL, sz);
  ctx.moveTo(-sz + bL, sz); ctx.lineTo(-sz, sz); ctx.lineTo(-sz, sz - bL);
  ctx.stroke();
  ctx.restore();
};
