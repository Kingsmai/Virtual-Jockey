/**
 * Plugin M - Variant 4: Floor Equalizer Pillars Grid
 * 透视网格上拔地而起的立体柱状阵列
 */

export const id = 'var4';
export const name = 'Floor Equalizer Pillars Grid';
export const desc = '透视网格上拔地而起的立体柱状阵列';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const fY = h * 0.6;
  const cols = 12;
  for (let c = -cols; c <= cols; c++) {
    const bx = cx + c * (w / 14);
    const colH = (Math.sin(c * 0.8 + time * 10) * 0.5 + 0.5) * 120 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 220, 0, 0.8)', p * 0.8, c * 25, time, v);
    ctx.lineWidth = 2.5 * p;
    ctx.beginPath();
    ctx.moveTo(bx, h);
    ctx.lineTo(bx, h - colH);
    ctx.stroke();
  }
  ctx.restore();
};
