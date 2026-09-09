/**
 * Plugin O - Variant 1: Triple Gyro Gimbals
 * 三轴交叉动态旋转立体陀螺仪环
 */

export const id = 'var1';
export const name = 'Triple Gyro Gimbals';
export const desc = '三轴交叉动态旋转立体陀螺仪环';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.5 * p;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 170, 0.85)', p * 0.85, 150, time, v);
  ctx.beginPath();
  ctx.ellipse(0, 0, 260 * p, 90 * p, time * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, 0, 260 * p, 90 * p, -time * 3 + Math.PI / 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};
