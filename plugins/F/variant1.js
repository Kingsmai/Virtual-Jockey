/**
 * Plugin F - Variant 1: Floor Laser Fan
 * 地面向上仰角180°大扇形动态摇摆激光
 */

export const id = 'var1';
export const name = 'Floor Laser Fan';
export const desc = '地面向上仰角180°大扇形动态摇摆激光';

export const render = (ctx, state) => {
  const { height: h, cx, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const beams = 18;
  for (let i = 0; i < beams; i++) {
    const baseAngle = Math.PI + (i / (beams - 1)) * Math.PI;
    const swing = Math.sin(time * 4 + i * 0.3) * 0.18;
    const angle = baseAngle + swing;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 255, 128, ${p * 0.8})`, p * 0.8, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, h);
    ctx.lineTo(cx + Math.cos(angle) * maxDim, h + Math.sin(angle) * maxDim);
    ctx.stroke();
  }
};
