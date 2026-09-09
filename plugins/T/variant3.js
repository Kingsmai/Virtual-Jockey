/**
 * Plugin T - Variant 3: Dual Gimbal Rangefinder
 * 双万向测距仪刻度圈旋转联动
 */

export const id = 'var3';
export const name = 'Dual Gimbal Rangefinder';
export const desc = '双万向测距仪刻度圈旋转联动';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.0 * p;
  // Inner ring
  ctx.save();
  ctx.rotate(time * 4);
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 240, 255, 0.9)', p * 0.9, 180, time, v);
  ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.arc(0, 0, 100 * p, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  // Outer ring
  ctx.save();
  ctx.rotate(-time * 2.5);
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 230, 0, 0.9)', p * 0.9, 60, time, v);
  ctx.setLineDash([25, 15]);
  ctx.beginPath(); ctx.arc(0, 0, 180 * p, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  ctx.restore();
};
