/**
 * Plugin Z - Variant 4: Dual Crystal Crowns
 * 双层反向环绕的钻石王冠棱镜
 */

export const id = 'var4';
export const name = 'Dual Crystal Crowns';
export const desc = '双层反向环绕的钻石王冠棱镜';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.0 * p;
  // Outer crown
  ctx.save();
  ctx.rotate(time * 2);
  const count1 = 16;
  const r1 = maxDim * 0.3 * p;
  for (let i = 0; i < count1; i++) {
    const a = (i / count1) * Math.PI * 2;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 220, 0.8)', p * 0.8, i * 25, time, v);
    utils.drawPolygon(ctx, Math.cos(a) * r1, Math.sin(a) * r1, 14 * p, 3, a);
    ctx.fill();
  }
  ctx.restore();
  // Inner crown
  ctx.save();
  ctx.rotate(-time * 2.5);
  const count2 = 12;
  const r2 = maxDim * 0.18 * p;
  for (let i = 0; i < count2; i++) {
    const a = (i / count2) * Math.PI * 2;
    ctx.fillStyle = utils.getStyleColor('rgba(0, 255, 180, 0.85)', p * 0.85, i * 30, time, v);
    utils.drawPolygon(ctx, Math.cos(a) * r2, Math.sin(a) * r2, 10 * p, 4, a);
    ctx.fill();
  }
  ctx.restore();
  ctx.restore();
};
