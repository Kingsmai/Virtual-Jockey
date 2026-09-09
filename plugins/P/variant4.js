/**
 * Plugin P - Variant 4: Circular Radial Oscilloscope
 * 中央圆形径向频谱声波跳动环
 */

export const id = 'var4';
export const name = 'Circular Radial Oscilloscope';
export const desc = '中央圆形径向频谱声波跳动环';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.0 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p * 0.9, 200, time, v);
  ctx.beginPath();
  const points = 120;
  const baseR = 150 * p;
  for (let i = 0; i <= points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const wave = Math.sin(ang * 8 + time * 20) * 35 * p;
    const r = baseR + wave;
    const x = Math.cos(ang) * r;
    const y = Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};
