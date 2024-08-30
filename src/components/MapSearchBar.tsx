'use client';

import { useQueryParams } from '@/hooks/useQueryParams';
import { getCoordinates } from '@/lib/geocodeAddress';
import { useState } from 'react';
import { LocationSearch } from './LocationSearch';

interface MapSearchBar {
  placeholder: string;
  onUseCurrentLocationSelection(e: boolean): void;
}

interface HandleSelectValueParams {
  placeId: string;
  text: string;
}

export function MapSearchBar({
  placeholder,
  onUseCurrentLocationSelection,
}: MapSearchBar) {
  const { setQueryParam } = useQueryParams();

  const [query, setQuery] = useState<string>('');

  function handleQueryChange(q: string) {
    setQuery((_prev) => q);
  }

  async function handleSelectValue({ placeId, text }: HandleSelectValueParams) {
    const { lat, lng, formattedAddress } = await getCoordinates(placeId);
    setQuery(text);
    setQueryParam('address', formattedAddress);
    setQueryParam('lat', `${lat}`);
    setQueryParam('lng', `${lng}`);
    onUseCurrentLocationSelection(false);
  }

  return (
    <LocationSearch
      query={query}
      errorText="Something went wrong"
      onSelectValue={handleSelectValue}
      onQueryChange={handleQueryChange}
      placeholder={placeholder}
    />
  );
}
