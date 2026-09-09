/**
 * Plugin B - Variant 2: Vertical Pillar Sweeper
 * 高密度纵向竖条激光光栅左右横扫
 */

export const id = 'var2';
export const name = 'Vertical Pillar Sweeper';
export const desc = '高密度纵向竖条激光光栅左右横扫';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const bars = 30;
  const barW = w / bars;
  const offset = (time * 500) % (barW * 2);
  ctx.fillStyle = utils.getStyleColor('rgba(0, 255, 180, 0.85)', p * 0.85, 120, time, v);
  for (let x = -barW * 2; x < w + barW * 2; x += barW * 2) {
    ctx.fillRect(x + offset, 0, barW * 0.7, h);
  }
};
