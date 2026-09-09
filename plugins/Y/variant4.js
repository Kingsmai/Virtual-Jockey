/**
 * Plugin Y - Variant 4: Center Outward EQ Bars
 * 屏幕中央水平线向上下双向爆发频谱
 */

export const id = 'var4';
export const name = 'Center Outward EQ Bars';
export const desc = '屏幕中央水平线向上下双向爆发频谱';

export const render = (ctx, state) => {
  const { width: w, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 36;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.35 + time * 22) * 0.5 + 0.5) * 160 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, i * 12, time, v);
    ctx.fillRect(i * colW + 2, cy - barH * 0.5, colW - 4, barH);
  }
};
