/**
 * Plugin Z - Variant 2: Cascading Crystal Rain
 * 向下飘落翻滚折射的水晶雨
 */

export const id = 'var2';
export const name = 'Cascading Crystal Rain';
export const desc = '向下飘落翻滚折射的水晶雨';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const shards = 28;
  for (let i = 0; i < shards; i++) {
    const x = ((i * 187) % w);
    const y = (time * 250 + i * 40) % (h + 80) - 40;
    const rot = time * 4 + i;
    const sz = 16 * p;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 20, time, v);
    ctx.lineWidth = 2 * p;
    utils.drawPolygon(ctx, 0, 0, sz, 4);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
};
