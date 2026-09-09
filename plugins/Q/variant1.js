/**
 * Plugin Q - Variant 1: Center Point Convergence
 * 四角加农炮汇聚中心高能轰击
 */

export const id = 'var1';
export const name = 'Center Point Convergence';
export const desc = '四角加农炮汇聚中心高能轰击';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const beamW = (Math.sin(time * 20) * 3 + 6) * p;
  ctx.lineWidth = beamW;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 68, 0.85)', p * 0.85, 0, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(cx, cy);
  ctx.moveTo(w, 0); ctx.lineTo(cx, cy);
  ctx.moveTo(0, h); ctx.lineTo(cx, cy);
  ctx.moveTo(w, h); ctx.lineTo(cx, cy);
  ctx.stroke();
};
