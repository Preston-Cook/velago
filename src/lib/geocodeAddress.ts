interface GetCoordinatesReturn {
  lat: number;
  lng: number;
  formattedAddress: string;
}

import { GOOGLE_MAPS_GEOCODING_ENDPOINT } from '@/config/apiEndpoints';

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export async function geocodeAddress(
  placeId: string,
): Promise<GetCoordinatesReturn> {
  const params = new URLSearchParams({
    place_id: placeId,
    key: GOOGLE_MAPS_API_KEY,
  });
  const query = params.toString();

  const res = await fetch(`${GOOGLE_MAPS_GEOCODING_ENDPOINT}?${query}`);
  const data = await res.json();
  const { results } = data;

  const loc = results[0];

  const coords = loc.geometry.location;

  const formattedAddress = loc.formatted_address as string;

  return { ...coords, formattedAddress };
}
