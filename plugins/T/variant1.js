/**
 * Plugin T - Variant 1: Circle & Rotating Square HUD
 * 经典准星圆环与反向旋转方框
 */

export const id = 'var1';
export const name = 'Circle & Rotating Square HUD';
export const desc = '经典准星圆环与反向旋转方框';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 136, 0.85)', p * 0.85, 120, time, v);
  ctx.lineWidth = 2 * p;
  ctx.beginPath();
  ctx.arc(0, 0, 160 * p, 0, Math.PI * 2);
  ctx.stroke();
  ctx.rotate(-time * 3);
  ctx.strokeRect(-110 * p, -110 * p, 220 * p, 220 * p);
  ctx.restore();
};
