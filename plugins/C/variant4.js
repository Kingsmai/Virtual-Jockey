/**
 * Plugin C - Variant 4: Segmented Target Box
 * 战术锁定准星与四角动态括号光刃
 */

export const id = 'var4';
export const name = 'Segmented Target Box';
export const desc = '战术锁定准星与四角动态括号光刃';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 1.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 180, 0, 0.9)', p, 45, time, v);
  ctx.lineWidth = 3.5 * p;
  const sz = 120 * p + Math.sin(time * 8) * 20;
  // Box brackets
  const bL = 40;
  // Top-left
  ctx.beginPath(); ctx.moveTo(-sz, -sz + bL); ctx.lineTo(-sz, -sz); ctx.lineTo(-sz + bL, -sz); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(sz - bL, -sz); ctx.lineTo(sz, -sz); ctx.lineTo(sz, -sz + bL); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(sz, sz - bL); ctx.lineTo(sz, sz); ctx.lineTo(sz - bL, sz); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(-sz + bL, sz); ctx.lineTo(-sz, sz); ctx.lineTo(-sz, sz - bL); ctx.stroke();
  // Inner cross
  ctx.beginPath();
  ctx.moveTo(-sz * 0.6, 0); ctx.lineTo(sz * 0.6, 0);
  ctx.moveTo(0, -sz * 0.6); ctx.lineTo(0, sz * 0.6);
  ctx.stroke();
  ctx.restore();
};
