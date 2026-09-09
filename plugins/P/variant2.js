/**
 * Plugin P - Variant 2: Green Phosphor Oscilloscope
 * 高频绿色示波器矢量心电波形
 */

export const id = 'var2';
export const name = 'Green Phosphor Oscilloscope';
export const desc = '高频绿色示波器矢量心电波形';

export const render = (ctx, state) => {
  const { width: w, height: h, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 80, 0.95)', p * 0.95, 120, time, v);
  ctx.beginPath();
  for (let x = 0; x <= w; x += 8) {
    const noise = Math.sin(x * 0.05 + time * 30) * Math.cos(x * 0.02 + time * 15);
    const y = cy + noise * (h * 0.35 * p);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
};
