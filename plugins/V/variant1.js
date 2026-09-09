/**
 * Plugin V - Variant 1: Archimedean 4-Arm Spiral
 * 经典四臂阿基米德旋转吸入螺旋
 */

export const id = 'var1';
export const name = 'Archimedean 4-Arm Spiral';
export const desc = '经典四臂阿基米德旋转吸入螺旋';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 5);
  ctx.strokeStyle = utils.getStyleColor('rgba(160, 0, 255, 0.9)', p * 0.9, 270, time, v);
  ctx.lineWidth = 3.0 * p;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.15) {
    const rad = a * 18 * p;
    const vx = Math.cos(a) * rad;
    const vy = Math.sin(a) * rad;
    if (a === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
  }
  ctx.stroke();
  ctx.restore();
};
