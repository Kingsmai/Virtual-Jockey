/**
 * Plugin D - Variant 2: Octa Star Portal
 * 八角星多维空间几何扩散通道
 */

export const id = 'var2';
export const name = 'Octa Star Portal';
export const desc = '八角星多维空间几何扩散通道';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const count = 10;
  for (let i = 0; i < count; i++) {
    const prog = ((i / count + time * 0.7) % 1);
    const sz = prog * maxDim * 0.9;
    ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * (1 - prog)})`, p * (1 - prog), i * 35, time, v);
    ctx.beginPath();
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2 + (i % 2 === 0 ? time : -time) * 0.5;
      const r = (a % 2 === 0) ? sz : sz * 0.5;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
};
