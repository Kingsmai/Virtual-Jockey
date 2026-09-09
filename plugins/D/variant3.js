/**
 * Plugin D - Variant 3: Twisting Square Box
 * 旋转方框交替扭曲立体隧道
 */

export const id = 'var3';
export const name = 'Twisting Square Box';
export const desc = '旋转方框交替扭曲立体隧道';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const count = 9;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.9) % 1);
    const sz = prog * maxDim * 0.8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(prog * Math.PI + time * 0.5);
    ctx.strokeStyle = utils.getStyleColor(`rgba(255, 0, 180, ${p * (1 - prog)})`, p * (1 - prog), i * 45, time, v);
    ctx.strokeRect(-sz * 0.5, -sz * 0.5, sz, sz);
    ctx.restore();
  }
  ctx.restore();
};
