/**
 * Plugin O - Variant 2: Atomic Orbitals Particles
 * 卢瑟福原子模型高速运转电子粒子
 */

export const id = 'var2';
export const name = 'Atomic Orbitals Particles';
export const desc = '卢瑟福原子模型高速运转电子粒子';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  const orbits = 4;
  for (let o = 0; o < orbits; o++) {
    const tilt = (o / orbits) * Math.PI;
    ctx.lineWidth = 2.0 * p;
    ctx.strokeStyle = utils.getStyleColor('rgba(0, 200, 255, 0.5)', p * 0.5, o * 40, time, v);
    ctx.beginPath();
    ctx.ellipse(0, 0, 240 * p, 70 * p, tilt, 0, Math.PI * 2);
    ctx.stroke();

    // Electron dot
    const eAng = time * (4 + o * 2);
    const ex = Math.cos(eAng) * 240 * p;
    const ey = Math.sin(eAng) * 70 * p;
    const rx = ex * Math.cos(tilt) - ey * Math.sin(tilt);
    const ry = ex * Math.sin(tilt) + ey * Math.cos(tilt);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(rx, ry, 6 * p, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
};
