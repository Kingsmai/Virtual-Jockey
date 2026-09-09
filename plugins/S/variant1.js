/**
 * Plugin S - Variant 1: Full Screen Shutter Cut
 * 30Hz 高频极速全屏硬切断电快门
 */

export const id = 'var1';
export const name = 'Full Screen Shutter Cut';
export const desc = '30Hz 高频极速全屏硬切断电快门';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  const shutterRate = 180 * speed;
  if (Math.sin(time * shutterRate) > 0) {
    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = `rgba(255, 255, 255, ${p})`;
    ctx.fillRect(0, 0, w, h);
  }
};
