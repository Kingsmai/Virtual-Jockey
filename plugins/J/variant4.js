/**
 * Plugin J - Variant 4: Phosphor Green Scan Bar
 * 绿磷光超亮光束扫过伴随衰减拖尾
 */

export const id = 'var4';
export const name = 'Phosphor Green Scan Bar';
export const desc = '绿磷光超亮光束扫过伴随衰减拖尾';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const barY = (time * 600) % (h + 200) - 100;
  const grad = ctx.createLinearGradient(0, barY - 120, 0, barY + 20);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.8, utils.getStyleColor('rgba(0, 255, 80, 0.4)', p * 0.4, 120, time, v));
  grad.addColorStop(1, utils.getStyleColor('rgba(200, 255, 200, 0.95)', p * 0.95, 120, time, v));
  ctx.fillStyle = grad;
  ctx.fillRect(0, barY - 120, w, 140);
};
