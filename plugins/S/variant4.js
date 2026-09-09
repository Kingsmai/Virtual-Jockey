/**
 * Plugin S - Variant 4: Guillotine Vertical Slam
 * 断头台闸门极速下砸反弹快门
 */

export const id = 'var4';
export const name = 'Guillotine Vertical Slam';
export const desc = '断头台闸门极速下砸反弹快门';

export const render = (ctx, state) => {
  const { width: w, height: h, time, speed, intensity: p } = state;
  ctx.globalCompositeOperation = 'difference';
  const slam = Math.pow(Math.sin(time * 30 * speed) * 0.5 + 0.5, 4);
  const gateH = slam * h;
  ctx.fillStyle = `rgba(255, 255, 255, ${p})`;
  ctx.fillRect(0, 0, w, gateH);
};
