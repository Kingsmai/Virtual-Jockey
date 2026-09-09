/**
 * Plugin F - Variant 3: 3D Conical Laser Array
 * 3D 立体圆锥形激光束全景旋转扫射
 */

export const id = 'var3';
export const name = '3D Conical Laser Array';
export const desc = '3D 立体圆锥形激光束全景旋转扫射';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const beams = 24;
  for (let i = 0; i < beams; i++) {
    const ang = (i / beams) * Math.PI * 2 + time * 3;
    const endX = cx + Math.cos(ang) * (w * 0.6);
    const endY = h * 0.2 + (Math.sin(ang) * 0.5 + 0.5) * (h * 0.8);
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 230, 0, ${p * 0.8})`, p * 0.8, i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
};
