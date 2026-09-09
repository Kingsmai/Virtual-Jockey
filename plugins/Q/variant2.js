/**
 * Plugin Q - Variant 2: Perimeter Scanning Blasters
 * 四角炮口沿边缘左右循环扫射
 */

export const id = 'var2';
export const name = 'Perimeter Scanning Blasters';
export const desc = '四角炮口沿边缘左右循环扫射';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 4.0 * p;
  const sweep = Math.sin(time * 6) * 0.3;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 230, 0.9)', p * 0.9, 170, time, v);
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(cx + sweep * w, cy);
  ctx.moveTo(w, 0); ctx.lineTo(cx - sweep * w, cy);
  ctx.moveTo(0, h); ctx.lineTo(cx + sweep * w, cy);
  ctx.moveTo(w, h); ctx.lineTo(cx - sweep * w, cy);
  ctx.stroke();
};
