import { Point } from '@/types';

interface CalculateGeographicMidpointParams {
  coords: Point[];
}

export function calculateGeographicMidpoint({
  coords,
}: CalculateGeographicMidpointParams): Point | null {
  if (coords.length === 0) return null;

  // Convert degrees to radians
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  let x = 0,
    y = 0,
    z = 0;

  for (const { latitude, longitude } of coords) {
    const latRad = toRadians(latitude as number);
    const lngRad = toRadians(longitude as number);

    x += Math.cos(latRad) * Math.cos(lngRad);
    y += Math.cos(latRad) * Math.sin(lngRad);
    z += Math.sin(latRad);
  }

  const total = coords.length;
  x /= total;
  y /= total;
  z /= total;

  const hyp = Math.sqrt(x * x + y * y);
  const lat = toDegrees(Math.atan2(z, hyp));
  const lng = toDegrees(Math.atan2(y, x));

  return { latitude: lat, longitude: lng };
}
