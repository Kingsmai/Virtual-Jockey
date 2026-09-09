/**
 * Plugin S: Super Shutter
 * Bank: flash
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'S';
export const name = 'Super Shutter';
export const bank = 'flash';
export const bankTitle = '⚡ BANK 1: FLASH & STROBE 爆闪与快门';
export const desc = '经典黑白 30Hz 快门切片与断头台硬切';

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
