/**
 * Plugin K: Kaleidoscope
 * Bank: geometry
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'K';
export const name = 'Kaleidoscope';
export const bank = 'geometry';
export const bankTitle = '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道';
export const desc = '八重对称万花筒旋转与神圣几何';

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
