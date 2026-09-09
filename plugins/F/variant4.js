/**
 * Plugin F - Variant 4: High Density Laser Fingers
 * 48 路超高密度矩阵激光指尖舞动
 */

export const id = 'var4';
export const name = 'High Density Laser Fingers';
export const desc = '48 路超高密度矩阵激光指尖舞动';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.5 * p;
  const fingers = 36;
  for (let i = 0; i < fingers; i++) {
    const startX = (i / (fingers - 1)) * w;
    const sway = Math.sin(time * 6 + i * 0.4) * (w * 0.3);
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 255, 200, ${p * 0.75})`, p * 0.75, i * 10, time, v);
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + sway, h);
    ctx.stroke();
  }
};
