/**
 * Plugin Q: Quad Blasters
 * Bank: lasers
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'Q';
export const name = 'Quad Blasters';
export const bank = 'lasers';
export const bankTitle = '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃';
export const desc = '四角对角重型加农炮与对射能量光束';

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
