/**
 * Plugin K - Variant 1: Octa Mandala Circles
 * 八重对称万花筒旋转环绕环
 */

export const id = 'var1';
export const name = 'Octa Mandala Circles';
export const desc = '八重对称万花筒旋转环绕环';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 3);
  ctx.lineWidth = 2.5 * p;
  const branches = 8;
  const sz = (Math.sin(time * 6) * 0.3 + 0.7) * 160 * p;
  for (let i = 0; i < branches; i++) {
    ctx.rotate((Math.PI * 2) / branches);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 170, 0, 0.85)', p * 0.85, i * 30, time, v);
    ctx.beginPath();
    ctx.arc(50, 50, sz * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};
