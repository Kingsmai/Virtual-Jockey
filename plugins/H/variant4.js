/**
 * Plugin H - Variant 4: 3D Wireframe Hex Prism
 * 3D 立体旋转六棱柱透视骨架
 */

export const id = 'var4';
export const name = '3D Wireframe Hex Prism';
export const desc = '3D 立体旋转六棱柱透视骨架';

export const render = (ctx, state) => {
  const { cx, cy, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.lineWidth = 2.5 * p;
  const rTop = 180 * p, rBot = 180 * p;
  const hPrism = 220;
  const rot = time * 2;
  ctx.strokeStyle = utils.getStyleColor('rgba(0, 255, 150, 0.85)', p * 0.85, 90, time, v);
  // Top & Bottom caps
  utils.drawPolygon(ctx, 0, -hPrism * 0.5, rTop, 6, rot); ctx.stroke();
  utils.drawPolygon(ctx, 0, hPrism * 0.5, rBot, 6, rot); ctx.stroke();
  // Vertical struts
  for (let i = 0; i < 6; i++) {
    const a = rot + (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * rTop;
    const yOffset = Math.sin(a) * 30;
    ctx.beginPath();
    ctx.moveTo(x, -hPrism * 0.5 + yOffset);
    ctx.lineTo(x, hPrism * 0.5 + yOffset);
    ctx.stroke();
  }
  ctx.restore();
};
