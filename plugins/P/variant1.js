/**
 * Plugin P - Variant 1: RGB Separated Sine Waves
 * 红绿蓝三色分离正弦高振幅光谱波浪
 */

export const id = 'var1';
export const name = 'RGB Separated Sine Waves';
export const desc = '红绿蓝三色分离正弦高振幅光谱波浪';

export const render = (ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 4 * p;
  for (let k = 0; k < 3; k++) {
    ctx.strokeStyle = utils.getStyleColor(
      k === 0 ? 'rgba(255, 120, 0, 0.85)' : (k === 1 ? 'rgba(0, 240, 255, 0.85)' : 'rgba(255, 0, 180, 0.85)'),
      p * 0.85,
      k * 60,
      time,
      v
    );
    ctx.beginPath();
    for (let x = 0; x <= w; x += 15) {
      const y = cy + Math.sin(x * 0.012 + time * (18 + k * 4) + k) * (h * 0.28 * p);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};
