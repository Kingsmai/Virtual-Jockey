/**
 * Plugin A - Variant 3: Chrono Radial Burst
 * 中心扩散式径向能量脉冲爆闪
 */

export const id = 'var3';
export const name = 'Chrono Radial Burst';
export const desc = '中心扩散式径向能量脉冲爆闪';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, cy, maxDim, time, speed, intensity: p, globalVariant: v } = state;
  const flashRate = 80 * speed;
  const flash = (Math.sin(time * flashRate) * 0.5 + 0.5) * p;
  if (flash > 0.05) {
    ctx.save();
    ctx.globalCompositeOperation = (v === 3) ? 'difference' : 'lighter';
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxDim * 0.85);
    grad.addColorStop(0, `rgba(255, 255, 255, ${flash})`);
    grad.addColorStop(0.4, (v === 2) ? `hsla(${(time * 200) % 360}, 100%, 60%, ${flash * 0.8})` : `rgba(0, 240, 255, ${flash * 0.7})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
};
