/**
 * Plugin W - Variant 3: Cosmic Particle Swarm
 * 星际粒子风暴迎面漫天扑来
 */

export const id = 'var3';
export const name = 'Cosmic Particle Swarm';
export const desc = '星际粒子风暴迎面漫天扑来';

export const render = (ctx, state) => {
  const { cx, cy, maxDim, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const count = 80;
  for (let i = 0; i < count; i++) {
    const ang = (i * 2.399) + time * 0.5;
    const prog = ((i / count + time * 1.4) % 1);
    const dist = Math.pow(prog, 2) * maxDim * 0.75;
    const sz = prog * 8 * p;
    ctx.fillStyle = utils.getStyleColor('rgba(255, 240, 180, 0.9)', p * 0.9, i * 10, time, v);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist, sz, 0, Math.PI * 2);
    ctx.fill();
  }
};
