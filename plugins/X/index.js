/**
 * Plugin X: X-Ray Blade
 * Bank: lasers
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'X';
export const name = 'X-Ray Blade';
export const bank = 'lasers';
export const bankTitle = '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃';
export const desc = '对角交错反色光刃与剪刀切割';

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
