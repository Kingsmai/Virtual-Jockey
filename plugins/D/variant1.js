/**
 * Plugin D - Variant 1: Classic Diamond Zoom
 * 同心霓虹菱形向屏幕扑面放大
 */

export const id = 'var1';
export const name = 'Classic Diamond Zoom';
export const desc = '同心霓虹菱形向屏幕扑面放大';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.8) % 1);
    const sz = prog * maxDim * 0.85;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 230, 0, ${p * (1 - prog)})`, p * (1 - prog), i * 40, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz);
    ctx.lineTo(cx + sz, cy);
    ctx.lineTo(cx, cy + sz);
    ctx.lineTo(cx - sz, cy);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
};
