/**
 * Plugin L - Variant 1: Sine Wave Curtain
 * 正弦波动态呼吸垂直激光光幕
 */

export const id = 'var1';
export const name = 'Sine Wave Curtain';
export const desc = '正弦波动态呼吸垂直激光光幕';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const lines = 28;
  for (let l = 0; l < lines; l++) {
    const lx = (l / lines) * w;
    const alpha = (Math.sin(time * 25 + l * 1.5) * 0.5 + 0.5) * p;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 230, 255, ${alpha})`, alpha, l * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(lx, 0);
    ctx.lineTo(lx, h);
    ctx.stroke();
  }
};
