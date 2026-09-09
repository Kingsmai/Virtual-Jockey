/**
 * Plugin O - Variant 3: Planetary Halo Disc
 * 土星倾斜立体光环与环缝投影
 */

export const id = 'var3';
export const name = 'Planetary Halo Disc';
export const desc = '土星倾斜立体光环与环缝投影';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const tilt = Math.PI / 6;
  ctx.lineWidth = 3.0 * p;
  const count = 6;
  for (let i = 0; i < count; i++) {
    const radX = (150 + i * 25) * p;
    const radY = (50 + i * 8) * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 180, 50, 0.8)', p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.ellipse(0, 0, radX, radY, tilt + Math.sin(time) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};
