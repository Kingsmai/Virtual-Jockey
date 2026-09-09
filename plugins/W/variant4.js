/**
 * Plugin W - Variant 4: Quantum Warp Streaks
 * 色相分离量子加速条纹
 */

export const id = 'var4';
export const name = 'Quantum Warp Streaks';
export const desc = '色相分离量子加速条纹';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2 + Math.sin(time * 2 + i) * 0.2;
    const prog = ((i / count + time * 2.0) % 1);
    const l1 = prog * maxDim * 0.5;
    const l2 = l1 + prog * 180;
    ctx.strokeStyle = utils.getStyleColor(`hsla(${(i * 15 + time * 200) % 360}, 100%, 70%, ${p * 0.9})`, p * 0.9, i * 20, time, v);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * l1, cy + Math.sin(ang) * l1);
    ctx.lineTo(cx + Math.cos(ang) * l2, cy + Math.sin(ang) * l2);
    ctx.stroke();
  }
};
