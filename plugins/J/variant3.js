/**
 * Plugin J - Variant 3: High Frequency Grid Shutter
 * 高频纵横交错棋盘闪烁光栅
 */

export const id = 'var3';
export const name = 'High Frequency Grid Shutter';
export const desc = '高频纵横交错棋盘闪烁光栅';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const gridSz = 24;
  const frame = Math.floor(time * 30 * speed);
  ctx.fillStyle = `rgba(255, 255, 255, ${p * 0.9})`;
  for (let y = 0; y < h; y += gridSz) {
    for (let x = 0; x < w; x += gridSz) {
      if ((Math.floor(x / gridSz) + Math.floor(y / gridSz) + frame) % 2 === 0) {
        ctx.fillRect(x, y, gridSz, gridSz);
      }
    }
  }
};
