/**
 * Plugin X - Variant 3: Multi Diagonal X-Mesh Grid
 * 多组平行对角线组成的菱形光刃网
 */

export const id = 'var3';
export const name = 'Multi Diagonal X-Mesh Grid';
export const desc = '多组平行对角线组成的菱形光刃网';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = '#ffffff';
  const count = 6;
  const offset = (time * 200) % 100;
  for (let i = -count; i <= count; i++) {
    const shift = i * 150 + offset;
    ctx.beginPath();
    ctx.moveTo(shift, 0); ctx.lineTo(shift + w, h);
    ctx.moveTo(w - shift, 0); ctx.lineTo(-shift, h);
    ctx.stroke();
  }
};
