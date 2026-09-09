/**
 * Plugin G - Variant 2: CRT Horizontal Tears
 * CRT 显像管行同步丢失横向撕裂带
 */

export const id = 'var2';
export const name = 'CRT Horizontal Tears';
export const desc = 'CRT 显像管行同步丢失横向撕裂带';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = 'difference';
  const strips = 8;
  for (let i = 0; i < strips; i++) {
    const isTorn = Math.sin(time * 40 + i * 5) > 0.3;
    if (isTorn) {
      const y = (i / strips) * h;
      const sh = h / strips * 0.6;
      ctx.fillStyle = `rgba(255, 255, 255, ${p * 0.8})`;
      ctx.fillRect(0, y, w, sh);
    }
  }
};
