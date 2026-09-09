/**
 * Plugin D - Variant 4: 3D Perspective Wire Corridor
 * 透视菱形走廊带四角连接线
 */

export const id = 'var4';
export const name = '3D Perspective Wire Corridor';
export const desc = '透视菱形走廊带四角连接线';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  // Corner depth lines
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.4)', p * 0.4, 0, time, v);
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - maxDim * 0.8);
  ctx.moveTo(cx, cy); ctx.lineTo(cx + maxDim * 0.8, cy);
  ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + maxDim * 0.8);
  ctx.moveTo(cx, cy); ctx.lineTo(cx - maxDim * 0.8, cy);
  ctx.stroke();

  const count = 8;
  for (let i = 0; i < count; i++) {
    const prog = Math.pow(((i / count + time * 0.8) % 1), 2);
    const sz = prog * maxDim * 0.8;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 200, 0, ${p * (1 - prog)})`, p * (1 - prog), i * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz); ctx.lineTo(cx + sz, cy); ctx.lineTo(cx, cy + sz); ctx.lineTo(cx - sz, cy);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
};
