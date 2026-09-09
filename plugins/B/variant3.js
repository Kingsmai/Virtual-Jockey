/**
 * Plugin B - Variant 3: Chevron Arrows
 * V字形巨型箭头光栅高速下落
 */

export const id = 'var3';
export const name = 'Chevron Arrows';
export const desc = 'V字形巨型箭头光栅高速下落';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 14 * p;
  const count = 10;
  const spacing = h / count;
  const offset = (time * 400) % (spacing * 2);
  for (let i = -2; i < count + 2; i++) {
    const y = i * spacing + offset;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, i * 30, time, v);
    ctx.beginPath();
    ctx.moveTo(0, y - 80);
    ctx.lineTo(cx, y + 40);
    ctx.lineTo(w, y - 80);
    ctx.stroke();
  }
  ctx.restore();
};
