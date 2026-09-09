/**
 * Plugin C - Variant 3: Radar Sweep Blade
 * 360° 雷达扫描激光刀与磷光拖尾
 */

export const id = 'var3';
export const name = 'Radar Sweep Blade';
export const desc = '360° 雷达扫描激光刀与磷光拖尾';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const ang = time * 4.5;
  // Radar fan trail
  const trailSegments = 16;
  for (let i = 0; i < trailSegments; i++) {
    const a1 = ang - (i / trailSegments) * (Math.PI / 2);
    const a2 = ang - ((i + 1) / trailSegments) * (Math.PI / 2);
    const alpha = (1 - i / trailSegments) * 0.4 * p;
    ctx.fillStyle = utils.getStyleColor(`rgba(0, 255, 120, ${alpha})`, alpha, 90, time, v);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim, a2, a1);
    ctx.closePath();
    ctx.fill();
  }
  // Sharp leading edge
  ctx.strokeStyle = utils.getStyleColor('rgba(255, 255, 255, 0.95)', p * 0.95, 0, time, v);
  ctx.lineWidth = 3 * p;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(ang) * maxDim, Math.sin(ang) * maxDim);
  ctx.stroke();
  ctx.restore();
};
