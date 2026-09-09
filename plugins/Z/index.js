/**
 * Plugin Z: Zenith Shards
 * Bank: geometry
 */
import * as variant1 from './variant1.js';
import * as variant2 from './variant2.js';
import * as variant3 from './variant3.js';
import * as variant4 from './variant4.js';

export const key = 'Z';
export const name = 'Zenith Shards';
export const bank = 'geometry';
export const bankTitle = '🌀 BANK 3: GEOMETRY & PORTALS 几何与时空隧道';
export const desc = '多边形水晶几何环绕与晶体折射';

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
