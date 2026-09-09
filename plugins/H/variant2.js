/**
 * Plugin H - Variant 2: Hex Grid Honeycomb
 * 全屏蜂窝六边形点阵能量网
 */

export const id = 'var2';
export const name = 'Hex Grid Honeycomb';
export const desc = '全屏蜂窝六边形点阵能量网';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1.8 * p;
  const hexR = 50;
  const hDist = hexR * Math.sqrt(3);
  const vDist = hexR * 1.5;
  for (let y = -hexR; y < h + hexR * 2; y += vDist) {
    const row = Math.floor(y / vDist);
    const xOff = (row % 2 === 0) ? 0 : hDist * 0.5;
    for (let x = -hexR; x < w + hexR * 2; x += hDist) {
      const pulse = Math.sin(time * 8 + (x + y) * 0.01) * 0.5 + 0.5;
      ctx.strokeStyle = utils.getStyleColor(`rgba(255, 180, 0, ${p * pulse * 0.75})`, p * pulse * 0.75, (x + y) * 0.1, time, v);
      utils.drawPolygon(ctx, x + xOff, y, hexR * 0.85, 6, Math.PI / 6);
      ctx.stroke();
    }
  }
  ctx.restore();
};
