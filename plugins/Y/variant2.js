/**
 * Plugin Y - Variant 2: Radial Circular Equalizer
 * 360° 环形向外跳动的重低音电平圈
 */

export const id = 'var2';
export const name = 'Radial Circular Equalizer';
export const desc = '360° 环形向外跳动的重低音电平圈';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const cols = 48;
  for (let i = 0; i < cols; i++) {
    const ang = (i / cols) * Math.PI * 2;
    const barLen = (Math.sin(i * 0.4 + time * 20) * 0.5 + 0.5) * 140 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 235, 0, 0.85)', p * 0.85, i * 10, time, v);
    ctx.lineWidth = 4 * p;
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * 60, Math.sin(ang) * 60);
    ctx.lineTo(Math.cos(ang) * (60 + barLen), Math.sin(ang) * (60 + barLen));
    ctx.stroke();
  }
  ctx.restore();
};
