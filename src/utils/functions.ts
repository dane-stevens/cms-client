export function checkIsInside(
  bounds: DOMRect,
  coordinates: { x: number; y: number }
) {
  if (!bounds || !coordinates) return false;
  return bounds.x < coordinates.x &&
    bounds.y < coordinates.y &&
    bounds.x + bounds.width > coordinates.x &&
    bounds.y + bounds.height > coordinates.y
    ? true
    : false;
}
