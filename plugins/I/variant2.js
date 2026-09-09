/**
 * Plugin I - Variant 2: Aperture Blade Iris
 * 机械镜头多片光圈光速开合
 */

export const id = 'var2';
export const name = 'Aperture Blade Iris';
export const desc = '机械镜头多片光圈光速开合';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  ctx.lineWidth = 3.0 * p;
  const blades = 10;
  const apertureR = (Math.sin(time * 8) * 0.3 + 0.5) * maxDim * 0.35 * p;
  for (let i = 0; i < blades; i++) {
    const ang = (i / blades) * Math.PI * 2;
    const p1x = Math.cos(ang) * apertureR;
    const p1y = Math.sin(ang) * apertureR;
    const p2x = Math.cos(ang + 0.8) * maxDim * 0.6;
    const p2y = Math.sin(ang + 0.8) * maxDim * 0.6;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * 0.9})`, p * 0.9, i * 25, time, v);
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();
  }
  ctx.restore();
};
