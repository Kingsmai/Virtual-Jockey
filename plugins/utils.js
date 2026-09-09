/**
 * Shared Plugin Utilities for VJ Engine
 */

export function getStyleColor(baseHex, alpha = 1, shiftOffset = 0, time = 0, globalVariant = 0) {
  if (globalVariant === 1) {
    // Hyper Laser (Pure White / Intense Cyan-white)
    return `rgba(255, 255, 255, ${alpha})`;
  }
  if (globalVariant === 2) {
    // Acid Rainbow (Dynamic HSV cycling)
    const hue = (time * 80 + shiftOffset) % 360;
    return `hsla(${hue}, 100%, 60%, ${alpha})`;
  }
  if (globalVariant === 3) {
    // Glitch Noir (Monochrome Invert Tint)
    return `rgba(240, 245, 255, ${alpha * 0.9})`;
  }
  // Default Cyber Neon
  return baseHex;
}

export function drawPolygon(ctx, cx, cy, radius, sides, angle = 0) {
  if (sides < 3) return;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = angle + (i / sides) * Math.PI * 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, angle = 0) {
  let rot = (Math.PI / 2) * 3 + angle;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}
