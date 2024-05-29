import { Point } from '@/types/Point';

const endpoint = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_GEOCODING_ENDPOINT as string;
const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export async function getCoordinates(placeId: string) {
  const params = new URLSearchParams({ place_id: placeId, key });
  const query = params.toString();

  const res = await fetch(`${endpoint}?${query}`);
  const data = await res.json();
  const { results } = data;

  const loc = results[0];
  // retrieve lat and lng coords from api res
  const coords = loc.geometry.location as Point;

  // get formatted address
  const formattedAddress = loc.formatted_address as string;

  return { ...coords, formattedAddress };
}
