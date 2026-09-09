/**
 * Plugin W - Variant 1: Relativistic Star Streaks
 * 经典千隼号超空间光速拉伸光束
 */

export const id = 'var1';
export const name = 'Relativistic Star Streaks';
export const desc = '经典千隼号超空间光速拉伸光束';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 2.5 * p;
  const stars = 60;
  for (let s = 0; s < stars; s++) {
    const ang = (s / stars) * Math.PI * 2;
    const speedProg = ((s / stars + time * 1.2) % 1);
    const len1 = speedProg * maxDim * 0.6;
    const len2 = len1 + speedProg * 140;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.85)', p * 0.85, s * 8, time, v);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * len1, cy + Math.sin(ang) * len1);
    ctx.lineTo(cx + Math.cos(ang) * len2, cy + Math.sin(ang) * len2);
    ctx.stroke();
  }
};
