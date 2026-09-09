/**
 * Plugin V - Variant 2: Black Hole Accretion Disk
 * 黑洞吸积盘引力透镜双向旋转光环
 */

export const id = 'var2';
export const name = 'Black Hole Accretion Disk';
export const desc = '黑洞吸积盘引力透镜双向旋转光环';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const arms = 6;
  ctx.lineWidth = 2.5 * p;
  for (let i = 0; i < arms; i++) {
    const baseA = (i / arms) * Math.PI * 2 + time * 4;
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 100, 0, 0.85)', p * 0.85, i * 40, time, v);
    ctx.beginPath();
    for (let s = 10; s < 300; s += 10) {
      const a = baseA + s * 0.02;
      const x = Math.cos(a) * s * p;
      const y = Math.sin(a) * s * p;
      if (s === 10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
};
