/**
 * Plugin M - Variant 1: Outrun Floor Grid
 * 经典 Outrun 赛博合成波地面网格
 */

export const id = 'var1';
export const name = 'Outrun Floor Grid';
export const desc = '经典 Outrun 赛博合成波地面网格';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const fY = h * 0.58;
  const fH = h - fY;
  ctx.lineWidth = 1.8 * p;
  // Vertical perspective rays
  for (let g = -12; g <= 12; g++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 180, 0.65)', p * 0.65, g * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, fY);
    ctx.lineTo(cx + g * (w / 10), h);
    ctx.stroke();
  }
  // Horizontal racing bars
  const rows = 11;
  const offset = (time * 1.5) % 1;
  for (let r = 0; r < rows; r++) {
    const prog = (r + offset) / rows;
    const y = fY + Math.pow(prog, 2.5) * fH;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * prog * 0.9})`, p * prog * 0.9, r * 25, time, v);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
};
