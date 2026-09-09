/**
 * Plugin R - Variant 3: Volumetric God Rays
 * 带柔和透明度渐变穿透雾气的耶稣光束
 */

export const id = 'var3';
export const name = 'Volumetric God Rays';
export const desc = '带柔和透明度渐变穿透雾气的耶稣光束';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 2);
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const ang = (i / rays) * Math.PI * 2;
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, maxDim * 0.7);
    grad.addColorStop(0, utils.getStyleColor('rgba(255, 255, 255, 0.9)', p * 0.9, i * 20, time, v));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxDim * 0.7, ang - 0.12, ang + 0.12);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
};
