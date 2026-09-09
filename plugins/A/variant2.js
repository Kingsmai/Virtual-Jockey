/**
 * Plugin A - Variant 2: Hyper Syncopation
 * 三倍率切分音错位极速闪光
 */

export const id = 'var2';
export const name = 'Hyper Syncopation';
export const desc = '三倍率切分音错位极速闪光';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  const flash1 = Math.sin(time * 150 * speed) > 0.4 ? 1 : 0;
  const flash2 = Math.cos(time * 210 * speed) > 0.5 ? 0.8 : 0;
  const combined = Math.max(flash1, flash2) * p;
  if (combined > 0.01) {
    ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
    ctx.fillStyle = (v === 2)
      ? `hsla(${(time * 400 + 60) % 360}, 100%, 80%, ${combined})`
      : `rgba(240, 250, 255, ${combined})`;
    ctx.fillRect(0, 0, w, h);
  }
};
