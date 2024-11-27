export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rPrime = 0,
    gPrime = 0,
    bPrime = 0;

  if (0 <= h && h < 60) {
    rPrime = c;
    gPrime = x;
    bPrime = 0;
  } else if (60 <= h && h < 120) {
    rPrime = x;
    gPrime = c;
    bPrime = 0;
  } else if (120 <= h && h < 180) {
    rPrime = 0;
    gPrime = c;
    bPrime = x;
  } else if (180 <= h && h < 240) {
    rPrime = 0;
    gPrime = x;
    bPrime = c;
  } else if (240 <= h && h < 300) {
    rPrime = x;
    gPrime = 0;
    bPrime = c;
  } else if (300 <= h && h < 360) {
    rPrime = c;
    gPrime = 0;
    bPrime = x;
  }

  const r = rPrime + m;
  const g = gPrime + m;
  const b = bPrime + m;

  return [r, g, b];
}
