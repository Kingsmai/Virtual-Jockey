/**
 * Plugin U - Variant 2: Segmented Blind Sun
 * 横向切片百叶条纹赛博巨日
 */

export const id = 'var2';
export const name = 'Segmented Blind Sun';
export const desc = '横向切片百叶条纹赛博巨日';

export const render = (ctx, state) => {
  const { width: w, height: h, cx, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const sunY = h * 0.55;
  const sunR = 160 * p;
  const strips = 14;
  for (let i = 0; i < strips; i++) {
    const yOff = (i / strips) * (sunR * 2) - sunR;
    const curY = sunY + yOff;
    const stripH = (i / strips) * 8 + 4;
    const chord = Math.sqrt(Math.max(0, sunR * sunR - yOff * yOff));
    if (chord > 0) {
      ctx.fillStyle = utils.getStyleColor('rgba(255, 80, 0, 0.9)', p * 0.9, i * 15, time, v);
      ctx.fillRect(cx - chord, curY, chord * 2, stripH);
    }
  }
  ctx.restore();
};
