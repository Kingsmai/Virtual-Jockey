/**
 * Plugin J - Variant 1: Difference Raster Jump
 * 反色高速扫描光栅硬切
 */

export const id = 'var1';
export const name = 'Difference Raster Jump';
export const desc = '反色高速扫描光栅硬切';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  ctx.fillStyle = `rgba(255, 255, 255, ${p})`;
  const sliceH = 14;
  const yOff = (time * 800) % (sliceH * 4);
  for (let y = -sliceH * 4; y < h + sliceH * 4; y += sliceH * 4) {
    ctx.fillRect(0, y + yOff, w, sliceH);
  }
};
