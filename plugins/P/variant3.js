/**
 * Plugin P - Variant 3: Multi Harmonics Stack
 * 6 层重叠倍频谐波光谱带
 */

export const id = 'var3';
export const name = 'Multi Harmonics Stack';
export const desc = '6 层重叠倍频谐波光谱带';

export const render = (ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const layers = 6;
  for (let l = 1; l <= layers; l++) {
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.7)', p * 0.7, l * 30, time, v);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 15) {
      const y = cy + Math.sin(x * (0.005 * l) + time * 12 + l) * (h * 0.22 * p);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};
