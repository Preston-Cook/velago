import { Point } from '@/types/Point';

interface ReverseGeocodeParams {
  lat: number;
  lng: number;
}

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const GOOGLE_MAPS_GEOCODING_ENDPOINT = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_GEOCODING_ENDPOINT as string;

export async function reverseGeocode({ lat, lng }: ReverseGeocodeParams) {
  const res = await fetch(
    `${GOOGLE_MAPS_GEOCODING_ENDPOINT}?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
  );

  if (!res.ok) {
    throw Error();
  }

  const data = await res.json();
  const { results } = data;

  const loc = results[0];
  // retrieve lat and lng coords from api res
  const coords = loc.geometry.location as Point;

  // get formatted address
  const formattedAddress = loc.formatted_address as string;

  return { ...coords, formattedAddress };
}
