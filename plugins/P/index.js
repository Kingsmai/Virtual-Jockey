/**
 * Plugin P: Prism Wave
 * Bank: synthwave
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'P';
export const name = 'Prism Wave';
export const bank = 'synthwave';
export const bankTitle = '🌐 BANK 4: SYNTHWAVE & STAGE 赛博舞池与地平线';
export const desc = '示波器高振幅光谱波浪与谐波';

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
