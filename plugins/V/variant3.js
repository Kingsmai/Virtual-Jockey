/**
 * Plugin V - Variant 3: Double Helix DNA Swirl
 * DNA 双螺旋交织向内塌缩
 */

export const id = 'var3';
export const name = 'Double Helix DNA Swirl';
export const desc = 'DNA 双螺旋交织向内塌缩';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.rotate(-time * 3);
  ctx.lineWidth = 3.0 * p;
  for (let h = 0; h < 2; h++) {
    const offsetA = h * Math.PI;
    ctx.strokeStyle = utils.getStyleColor(h === 0 ? 'rgba(0, 240, 255, 0.9)' : 'rgba(255, 0, 180, 0.9)', p * 0.9, h * 180, time, v);
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 6; a += 0.12) {
      const r = Math.pow(a, 1.4) * 16 * p;
      const x = Math.cos(a + offsetA) * r;
      const y = Math.sin(a + offsetA) * r;
      if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
};
