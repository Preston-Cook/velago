'use client';

import { useState } from 'react';
import { LocationSearch } from './LocationSearch';
import { getCoordinates } from '@/lib/geocodeAddress';
import { useQueryParams } from '@/hooks/useQueryParams';

interface MapSearchBar {
  placeholder: string;
}

export function MapSearchBar({ placeholder }: MapSearchBar) {
  const { setQueryParam } = useQueryParams();

  const [query, setQuery] = useState<string>('');

  function handleQueryChange(q: string) {
    setQuery((_prev) => q);
  }

  async function handleSelectValue(e: string) {
    const { lat, lng, formattedAddress } = await getCoordinates(e);

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
