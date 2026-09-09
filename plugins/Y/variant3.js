/**
 * Plugin Y - Variant 3: Ceiling & Floor Mirrored EQ
 * 天花板与地板上下对称对轰频谱柱
 */

export const id = 'var3';
export const name = 'Ceiling & Floor Mirrored EQ';
export const desc = '天花板与地板上下对称对轰频谱柱';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 28;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.5 + time * 18) * 0.5 + 0.5) * h * 0.35 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(0, 240, 255, 0.85)', p * 0.85, i * 20, time, v);
    // Bottom
    ctx.fillRect(i * colW + 2, h - barH, colW - 4, barH);
    // Top
    ctx.fillRect(i * colW + 2, 0, colW - 4, barH);
  }
};
