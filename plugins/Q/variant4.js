/**
 * Plugin Q - Variant 4: Quad Rotor Beam Turrets
 * 四角炮台发射 360° 自转旋转激光
 */

export const id = 'var4';
export const name = 'Quad Rotor Beam Turrets';
export const desc = '四角炮台发射 360° 自转旋转激光';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 3.0 * p;
  const len = 400;
  const corners = [{x: 0, y: 0}, {x: w, y: 0}, {x: 0, y: h}, {x: w, y: h}];
  corners.forEach((c, idx) => {
    const ang = time * 4 + idx * (Math.PI / 2);
    ctx.strokeStyle = utils.getStyleColor('rgba(255, 0, 150, 0.85)', p * 0.85, idx * 45, time, v);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x + Math.cos(ang) * len, c.y + Math.sin(ang) * len);
    ctx.stroke();
  });
};
