/**
 * Plugin K - Variant 4: Quad Mirror Kaleidoscope
 * 四象限对称多重折射方块光阵
 */

export const id = 'var4';
export const name = 'Quad Mirror Kaleidoscope';
export const desc = '四象限对称多重折射方块光阵';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const squares = 16;
  for (let i = 0; i < squares; i++) {
    const ang = (i / squares) * Math.PI * 2 + time * 2;
    const dist = (Math.sin(time * 5 + i) * 0.2 + 0.8) * 160 * p;
    ctx.save();
    ctx.translate(Math.cos(ang) * dist, Math.sin(ang) * dist);
    ctx.rotate(time * 4 + i);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 240, 0, 0.85)', p * 0.85, i * 20, time, v);
    ctx.strokeRect(-20 * p, -20 * p, 40 * p, 40 * p);
    ctx.restore();
  }
  ctx.restore();
};
