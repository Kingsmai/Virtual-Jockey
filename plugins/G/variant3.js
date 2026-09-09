/**
 * Plugin G - Variant 3: VCR VHS Static Noise
 * 复古录像带磁头白噪点条纹杂波
 */

export const id = 'var3';
export const name = 'VCR VHS Static Noise';
export const desc = '复古录像带磁头白噪点条纹杂波';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p } = state;
  ctx.globalCompositeOperation = 'lighter';
  const noiseBars = 15;
  for (let i = 0; i < noiseBars; i++) {
    const y = ((time * 800 + i * (h / noiseBars)) % h);
    const nh = Math.random() * 8 + 2;
    ctx.fillStyle = `rgba(200, 230, 255, ${p * 0.6 * Math.random()})`;
    ctx.fillRect(0, y, w, nh);
  }
};
