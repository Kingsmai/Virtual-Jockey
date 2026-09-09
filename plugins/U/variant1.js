/**
 * Plugin U - Variant 1: Classic Synth Sun Glow
 * 经典地平线赛博霓虹日出日落辉光
 */

export const id = 'var1';
export const name = 'Classic Synth Sun Glow';
export const desc = '经典地平线赛博霓虹日出日落辉光';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, maxDim, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = 'lighter';
  const sunG = ctx.createRadialGradient(cx, h * 0.6, 10, cx, h * 0.6, maxDim * 0.45);
  if (v === 2) {
    sunG.addColorStop(0, `hsla(${(time * 100) % 360}, 100%, 70%, ${p * 0.9})`);
    sunG.addColorStop(0.35, `hsla(${(time * 100 + 60) % 360}, 100%, 50%, ${p * 0.7})`);
  } else {
    sunG.addColorStop(0, `rgba(255, 255, 200, ${p * 0.9})`);
    sunG.addColorStop(0.35, `rgba(255, 0, 128, ${p * 0.7})`);
  }
  sunG.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sunG;
  ctx.fillRect(0, 0, w, h);
};
