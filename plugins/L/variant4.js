/**
 * Plugin L - Variant 4: Converging Perspective Beams
 * 透视汇聚到顶部的重型光束矩阵
 */

export const id = 'var4';
export const name = 'Converging Perspective Beams';
export const desc = '透视汇聚到顶部的重型光束矩阵';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const count = 20;
  for (let i = 0; i < count; i++) {
    const bx = (i / (count - 1)) * w;
    const alpha = (Math.sin(time * 18 + i) * 0.4 + 0.6) * p;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 255, 180, ${alpha})`, alpha, i * 18, time, v);
    ctx.beginPath();
    ctx.moveTo(cx, -50);
    ctx.lineTo(bx, h);
    ctx.stroke();
  }
};
