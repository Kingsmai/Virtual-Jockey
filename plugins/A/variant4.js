/**
 * Plugin A - Variant 4: Static Slices Strobe
 * 高频噪波水平随机切片频闪
 */

export const id = 'var4';
export const name = 'Static Slices Strobe';
export const desc = '高频噪波水平随机切片频闪';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
  const slices = 12;
  const sliceH = h / slices;
  for (let i = 0; i < slices; i++) {
    const isLit = Math.sin(time * 90 * speed + i * 2.3) > 0.2;
    if (isLit) {
      ctx.fillStyle = (v === 2)
        ? `hsla(${(time * 350 + i * 30) % 360}, 100%, 70%, ${p * 0.9})`
        : (v === 3 ? `rgba(255, 255, 255, ${p * 0.9})` : `rgba(255, 220, 240, ${p * 0.85})`);
      ctx.fillRect(0, i * sliceH, w, sliceH - 2);
    }
  }
};
