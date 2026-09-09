/**
 * Plugin W - Variant 2: Hyperspace Cylinder Grid
 * 曲率圆柱形隧道网格极速冲刺
 */

export const id = 'var2';
export const name = 'Hyperspace Cylinder Grid';
export const desc = '曲率圆柱形隧道网格极速冲刺';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.8);
  ctx.lineWidth = 2.0 * p;
  const spokes = 16;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.7)', p * 0.7, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * maxDim * 0.8, Math.sin(a) * maxDim * 0.8);
    ctx.stroke();
  }
  const rings = 8;
  for (let r = 0; r < rings; r++) {
    const prog = Math.pow(((r / rings + time * 1.5) % 1), 2.5);
    const rad = prog * maxDim * 0.8;
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 0, 150, ${p * (1 - prog)})`, p * (1 - prog), r * 30, time, v);
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};
