/**
 * Plugin N - Variant 4: 16-Spike Starlight Crown
 * 十六芒星刺向外绽放的钻石星冠
 */

export const id = 'var4';
export const name = '16-Spike Starlight Crown';
export const desc = '十六芒星刺向外绽放的钻石星冠';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 1.5);
  ctx.fillStyle = utils.getStyleColor('rgba(255, 230, 100, 0.85)', p * 0.85, 45, time, v);
  utils.drawStar(ctx, 0, 0, 16, 220 * p, 40 * p);
  ctx.fill();
  ctx.restore();
};
