/**
 * Plugin L - Variant 2: Hyper Velocity Rain
 * 光速下落的垂直激光雨针
 */

export const id = 'var2';
export const name = 'Hyper Velocity Rain';
export const desc = '光速下落的垂直激光雨针';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const drops = 36;
  for (let i = 0; i < drops; i++) {
    const x = ((i * 137.5) % w);
    const speed = 800 + (i % 5) * 200;
    const y = (time * speed + i * 50) % (h + 300) - 150;
    const len = 120 + (i % 4) * 40;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.9)', p * 0.9, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + len);
    ctx.stroke();
  }
};
