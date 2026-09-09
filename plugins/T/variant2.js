/**
 * Plugin T - Variant 2: Hex Lock Tactical Reticle
 * 蜂窝锁定战术角度刻度标尺
 */

export const id = 'var2';
export const name = 'Hex Lock Tactical Reticle';
export const desc = '蜂窝锁定战术角度刻度标尺';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 100, 0.9)', p * 0.9, 0, time, v);
  utils.drawPolygon(ctx, 0, 0, 150 * p, 6, time * 2);
  ctx.stroke();

  // Tick marks
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + time;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 160 * p, Math.sin(a) * 160 * p);
    ctx.lineTo(Math.cos(a) * 180 * p, Math.sin(a) * 180 * p);
    ctx.stroke();
  }
  ctx.restore();
};
