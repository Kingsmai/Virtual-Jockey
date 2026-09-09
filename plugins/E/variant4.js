/**
 * Plugin E - Variant 4: Clashing Dual Arc
 * 左右高压电极在中央激烈对撞爆出火花
 */

export const id = 'var4';
export const name = 'Clashing Dual Arc';
export const desc = '左右高压电极在中央激烈对撞爆出火花';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor(`rgba(255, 240, 50, ${p * 0.9})`, p * 0.9, 60, time, v);
  // Left arc
  ctx.beginPath();
  let x = 0, y = cy + Math.sin(time * 10) * 80;
  ctx.moveTo(x, y);
  while (x < cx) {
    x += 25;
    y += (Math.random() - 0.5) * 45;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Right arc
  ctx.beginPath();
  x = w; y = cy - Math.sin(time * 10) * 80;
  ctx.moveTo(x, y);
  while (x > cx) {
    x -= 25;
    y += (Math.random() - 0.5) * 45;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
};
