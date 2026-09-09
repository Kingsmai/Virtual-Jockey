/**
 * Plugin B - Variant 1: Down Slat Runner
 * 经典向下高速滑动的青色百叶光栅
 */

export const id = 'var1';
export const name = 'Down Slat Runner';
export const desc = '经典向下高速滑动的青色百叶光栅';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const bars = (v === 1) ? 44 : 22;
  const barH = h / bars;
  const offset = (time * 450) % (barH * 2);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, 0, time, v);
  for (let y = -barH * 2; y < h + barH * 2; y += barH * 2) {
    ctx.fillRect(0, y + offset, w, (v === 1 ? barH * 0.5 : barH));
  }
};
