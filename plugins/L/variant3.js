/**
 * Plugin L - Variant 3: Oscillating Laser Pillars
 * 左右大幅摆动的重型激光光柱
 */

export const id = 'var3';
export const name = 'Oscillating Laser Pillars';
export const desc = '左右大幅摆动的重型激光光柱';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const pillars = 6;
  for (let i = 0; i < pillars; i++) {
    const x = (w * 0.5) + Math.sin(time * 4 + i * 1.2) * (w * 0.42);
    const pw = (Math.sin(time * 15 + i) * 4 + 10) * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 0, 100, 0.85)', p * 0.85, i * 40, time, v);
    ctx.fillRect(x - pw * 0.5, 0, pw, h);
  }
};
