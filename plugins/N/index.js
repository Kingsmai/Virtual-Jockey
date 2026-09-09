/**
 * Plugin N: Nova Starburst
 * Bank: chaos
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'N';
export const name = 'Nova Starburst';
export const bank = 'chaos';
export const bankTitle = '✨ BANK 5: CELESTIAL & CHAOS 闪电星系与力场';
export const desc = '旋转八芒星超新星光芒与光学耀斑';

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
