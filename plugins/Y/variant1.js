/**
 * Plugin Y - Variant 1: Stage Floor VU Columns
 * 底部32路均衡器电平跳动频谱柱
 */

export const id = 'var1';
export const name = 'Stage Floor VU Columns';
export const desc = '底部32路均衡器电平跳动频谱柱';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const cols = 32;
  const colW = w / cols;
  for (let i = 0; i < cols; i++) {
    const barH = (Math.sin(i * 0.4 + time * 20) * 0.5 + 0.5) * h * 0.65 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 235, 0, 0.85)', p * 0.85, i * 15, time, v);
    ctx.fillRect(i * colW + 2, h - barH, colW - 4, barH);
  }
};
