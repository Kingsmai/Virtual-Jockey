/**
 * Plugin B - Variant 4: Matrix Checker Blinds
 * 双向交错移动的棋盘方块百叶窗
 */

export const id = 'var4';
export const name = 'Matrix Checker Blinds';
export const desc = '双向交错移动的棋盘方块百叶窗';

export const render = (ctx, state) => {
  const { width: w, height: h, time, intensity: p, globalVariant: v, utils } = state;
  ctx.globalCompositeOperation = 'lighter';
  const rows = 12;
  const cols = 16;
  const cw = w / cols;
  const rh = h / rows;
  for (let r = 0; r < rows; r++) {
    const dir = (r % 2 === 0) ? 1 : -1;
    const xOff = (time * 300 * dir) % (cw * 2);
    ctx.fillStyle = utils.getStyleColor('rgba(255, 230, 0, 0.8)', p * 0.8, r * 20, time, v);
    for (let c = -2; c < cols + 2; c += 2) {
      ctx.fillRect(c * cw + xOff, r * rh, cw, rh - 3);
    }
  }
};
