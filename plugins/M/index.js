/**
 * Plugin M: Matrix Grid
 * Bank: synthwave
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'M';
export const name = 'Matrix Grid';
export const bank = 'synthwave';
export const bankTitle = '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线';
export const desc = '3D 赛博舞池透视网格与无限穿梭';

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
