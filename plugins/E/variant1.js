/**
 * Plugin E - Variant 1: Vertical Thunderbolts
 * 纵向全屏落雷劈裂分叉电弧
 */

export const id = 'var1';
export const name = 'Vertical Thunderbolts';
export const desc = '纵向全屏落雷劈裂分叉电弧';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = utils.getStyleColor(`rgba(180, 100, 255, ${p * 0.9})`, p * 0.9, 260, time, v);
  ctx.lineWidth = 3.0 * p;
  const arcs = 4;
  for (let a = 0; a < arcs; a++) {
    ctx.beginPath();
    let curX = cx + Math.sin(time * 15 + a * 2.5) * w * 0.38;
    let curY = 0;
    ctx.moveTo(curX, curY);
    while (curY < h) {
      curX += (Math.random() - 0.5) * 50 + Math.sin(curY * 0.05 + time * 40 + a) * 35;
      curY += 22;
      ctx.lineTo(curX, curY);
    }
    ctx.stroke();
  }
};
