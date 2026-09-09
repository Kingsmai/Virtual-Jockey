/**
 * Plugin F: Fan Lasers
 * Bank: lasers
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'F';
export const name = 'Fan Lasers';
export const bank = 'lasers';
export const bankTitle = '💥 BANK 2: LASERS & CROSSHAIRS 激光与光刃';
export const desc = '扇形全景高能激光阵列与地面扫射';

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
