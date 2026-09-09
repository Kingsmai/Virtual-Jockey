/**
 * Plugin G - Variant 1: RGB Channel Displace
 * 红青双通道水平大幅度错位分裂
 */

export const id = 'var1';
export const name = 'RGB Channel Displace';
export const desc = '红青双通道水平大幅度错位分裂';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v } = state;
  ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'screen';
  const shift = Math.sin(time * 30) * 45 * p;
  ctx.fillStyle = `rgba(255, 0, 0, ${p * 0.5})`;
  ctx.fillRect(-shift, 0, w, h);
  ctx.fillStyle = `rgba(0, 255, 255, ${p * 0.5})`;
  ctx.fillRect(shift, 0, w, h);
};
