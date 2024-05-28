import { Point } from '@/types/Point';

const endpoint = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_GEOCODING_ENDPOINT as string;
const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export async function geocodeAddress(address: string): Promise<Point> {
  const params = new URLSearchParams({ address, key });
  const query = params.toString();

  const res = await fetch(`${endpoint}?${query}`);
  const data = await res.json();

  const { results } = data;
  return results[0].geometry.location;
}
