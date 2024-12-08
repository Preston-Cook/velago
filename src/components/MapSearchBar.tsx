'use client';

import { useQueryParams } from '@/hooks/useQueryParams';
import { geocodePlaceId } from '@/lib/geocodePlaceId';
import { useState } from 'react';
import { LocationSearch } from './LocationSearch';
interface MapSearchBar {
  placeholder: string;
}

interface HandleSelectValueParams {
  placeId: string;
  text: string;
}

export function MapSearchBar({ placeholder }: MapSearchBar) {
  const { setQueryParam } = useQueryParams();

  const [query, setQuery] = useState<string>('');

  function handleQueryChange(q: string) {
    setQuery(() => q);
  }

  async function handleSelectValue({ placeId, text }: HandleSelectValueParams) {
    const { lat, lng, formattedAddress } = await geocodePlaceId(placeId);
    setQuery(text);
    setQueryParam('address', formattedAddress);
    setQueryParam('lat', `${lat}`);
    setQueryParam('lng', `${lng}`);
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
