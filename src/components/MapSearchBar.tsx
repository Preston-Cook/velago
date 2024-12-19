'use client';

import { geocodePlaceId } from '@/lib/geocodePlaceId';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = new URLSearchParams(useSearchParams());
  const router = useRouter();

  const [query, setQuery] = useState<string>('');

  function handleQueryChange(q: string) {
    setQuery(() => q);
  }

  async function handleSelectValue({ placeId }: HandleSelectValueParams) {
    setQuery('');

    const { lat, lng, formattedAddress } = await geocodePlaceId(placeId);

    searchParams.set('lat', `${lat}`);
    searchParams.set('lng', `${lng}`);
    searchParams.set('address', `${formattedAddress}`);

    const queryString = searchParams.toString();
    const url = queryString ? `?${queryString}` : '';

    router.replace(`${window.location.pathname}${url}`);
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
