/**
 * Plugin F - Variant 2: Ceiling & Floor Dual Fan
 * 上下天花板与地板双重交叉对射激光扇
 */

export const id = 'var2';
export const name = 'Ceiling & Floor Dual Fan';
export const desc = '上下天花板与地板双重交叉对射激光扇';

export const render = (ctx, state) => {
  const { height: h, cx, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.0 * p;
  const beams = 20;
  for (let i = 0; i < beams; i++) {
    const swing = Math.sin(time * 5 + i * 0.25) * 0.2;
    // Bottom
    const bAngle = Math.PI + (i / (beams - 1)) * Math.PI + swing;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * 0.75})`, p * 0.75, i * 15, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, h);
    ctx.lineTo(cx + Math.cos(bAngle) * maxDim, h + Math.sin(bAngle) * maxDim);
    ctx.stroke();
    // Top
    const tAngle = (i / (beams - 1)) * Math.PI - swing;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 0, 128, ${p * 0.75})`, p * 0.75, i * 15 + 180, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx + Math.cos(tAngle) * maxDim, Math.sin(tAngle) * maxDim);
    ctx.stroke();
  }
};
