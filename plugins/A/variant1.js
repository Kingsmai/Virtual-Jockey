/**
 * Plugin A - Variant 1: Atomic Blitz
 * 全屏 24Hz 极限白炽爆闪
 */

export const id = 'var1';
export const name = 'Atomic Blitz';
export const desc = '全屏 24Hz 极限白炽爆闪';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  const flashRate = 120 * speed;
  const flash = Math.sin(time * flashRate) > 0 ? 1 : 0.08;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  ctx.fillStyle = (v === 2)
    ? `hsla(${(time * 300) % 360}, 100%, 75%, ${flash * p})`
    : `rgba(255, 255, 255, ${flash * p})`;
  ctx.fillRect(0, 0, w, h);
};
