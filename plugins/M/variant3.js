/**
 * Plugin M - Variant 3: Terrain Wire Canyon
 * 3D 伏线波浪高低起伏赛博山谷峡谷
 */

export const id = 'var3';
export const name = 'Terrain Wire Canyon';
export const desc = '3D 伏线波浪高低起伏赛博山谷峡谷';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const rows = 14;
  for (let r = 0; r < rows; r++) {
    const prog = r / rows;
    const baseY = h * 0.5 + Math.pow(prog, 2) * (h * 0.5);
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 255, 200, ${p * prog * 0.9})`, p * prog * 0.9, r * 20, time, v);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 20) {
      const hill = Math.sin(x * 0.015 + time * 5 + r) * (prog * 60);
      const y = baseY + hill;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
};
