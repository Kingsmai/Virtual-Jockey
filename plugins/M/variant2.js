/**
 * Plugin M - Variant 2: Dual Ceiling & Floor Tunnel
 * 上下双重天花板与地板无限透视隧道
 */

export const id = 'var2';
export const name = 'Dual Ceiling & Floor Tunnel';
export const desc = '上下双重天花板与地板无限透视隧道';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.6 * p;
  const renderHalf = (originY, targetY, isCeiling) => {
    const dist = Math.abs(targetY - originY);
    for (let g = -10; g <= 10; g++) {
      ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.6)', p * 0.6, g * 15, time, v);
      ctx.beginPath();
      ctx.moveTo(cx, originY);
      ctx.lineTo(cx + g * (w / 8), targetY);
      ctx.stroke();
    }
    const rows = 9;
    const offset = (time * 1.8) % 1;
    for (let r = 0; r < rows; r++) {
      const prog = (r + offset) / rows;
      const y = isCeiling ? originY - Math.pow(prog, 2.2) * dist : originY + Math.pow(prog, 2.2) * dist;
      ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * prog * 0.85})`, p * prog * 0.85, r * 20, time, v);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };
  renderHalf(h * 0.58, h, false);
  renderHalf(h * 0.42, 0, true);
  ctx.restore();
};
