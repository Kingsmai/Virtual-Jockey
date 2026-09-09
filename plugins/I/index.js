/**
 * Plugin I: Iris Tunnel
 * Bank: geometry
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'I';
export const name = 'Iris Tunnel';
export const bank = 'geometry';
export const bankTitle = '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道';
export const desc = '超空间环形光圈隧道与机械快门';

export const variants = [
  variant1,
  variant2,
  variant3,
  variant4
];

export function render(ctx, state, variantIdx = 0) {
  const v = variants[variantIdx % variants.length];
  if (v && v.render) {
    v.render(ctx, state);
  }
}
