/**
 * Plugin E - Variant 2: Tesla Cage Converge
 * 四边聚向屏幕中心的特斯拉电笼
 */

export const id = 'var2';
export const name = 'Tesla Cage Converge';
export const desc = '四边聚向屏幕中心的特斯拉电笼';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = utils.getStyleColor(`rgba(0, 240, 255, ${p * 0.85})`, p * 0.85, 190, time, v);
  ctx.lineWidth = 2.0 * p;
  const bolts = 8;
  for (let b = 0; b < bolts; b++) {
    const ang = (b / bolts) * Math.PI * 2 + time * 2;
    let startX = cx + Math.cos(ang) * Math.max(w, h) * 0.6;
    let startY = cy + Math.sin(ang) * Math.max(w, h) * 0.6;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let steps = 12;
    for (let s = 1; s <= steps; s++) {
      const frac = s / steps;
      let tx = startX + (cx - startX) * frac + (Math.random() - 0.5) * 30 * (1 - frac);
      let ty = startY + (cy - startY) * frac + (Math.random() - 0.5) * 30 * (1 - frac);
      ctx.lineTo(tx, ty);
    }
    ctx.stroke();
  }
};
