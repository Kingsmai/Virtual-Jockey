/**
 * Plugin V - Variant 4: Logarithmic Warp Spiral
 * 对数极速扭曲时空隧道螺旋线
 */

export const id = 'var4';
export const name = 'Logarithmic Warp Spiral';
export const desc = '对数极速扭曲时空隧道螺旋线';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(time * 8);
  ctx.lineWidth = 2.0 * p;
  const rays = 8;
  for (let r = 0; r < rays; r++) {
    const startA = (r / rays) * Math.PI * 2;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 140, 0.8)', p * 0.8, r * 30, time, v);
    ctx.beginPath();
    for (let step = 0; step < 50; step++) {
      const rad = Math.exp(step * 0.12) * 2 * p;
      const a = startA + step * 0.15;
      const x = Math.cos(a) * rad;
      const y = Math.sin(a) * rad;
      if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
};
