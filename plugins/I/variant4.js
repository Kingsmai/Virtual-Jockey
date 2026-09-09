/**
 * Plugin I - Variant 4: Concentric Eclipse Rings
 * 偏心重力透镜双光环交错扩散
 */

export const id = 'var4';
export const name = 'Concentric Eclipse Rings';
export const desc = '偏心重力透镜双光环交错扩散';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.6) % 1);
    const rad = prog * maxDim * 0.7;
    const offX = Math.sin(time * 4 + i) * 40;
    const offY = Math.cos(time * 4 + i) * 40;
    ctx.strokeStyle = utils.getStyleColor(`rgba(180, 0, 255, ${p * (1 - prog)})`, p * (1 - prog), i * 30, time, v);
    ctx.beginPath();
    ctx.arc(cx + offX, cy + offY, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
};
