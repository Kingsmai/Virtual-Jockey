/**
 * Plugin U - Variant 3: Neon Dawn Horizon Laser
 * 纯平地平线极强激光刃与上下双色辉光
 */

export const id = 'var3';
export const name = 'Neon Dawn Horizon Laser';
export const desc = '纯平地平线极强激光刃与上下双色辉光';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const horizY = h * 0.58;
  // Laser line
  ctx.fillStyle = utils.getStyleColor('rgba(255, 255, 255, 0.95)', p * 0.95, 0, time, v);
  ctx.fillRect(0, horizY - 3 * p, w, 6 * p);
  // Sky glow
  const skyG = ctx.createLinearGradient(0, horizY - 200, 0, horizY);
  skyG.addColorStop(0, 'rgba(0,0,0,0)');
  skyG.addColorStop(1, utils.getStyleColor('rgba(255, 0, 150, 0.6)', p * 0.6, 300, time, v));
  ctx.fillStyle = skyG;
  ctx.fillRect(0, horizY - 200, w, 200);
};
