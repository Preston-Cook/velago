'use client';

import { getCoordinates } from '@/lib/geocodeAddress';
import { useRouter } from 'next/navigation';
import { start as nprogressStart } from 'nprogress';
import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { LocationSearch } from './LocationSearch';

interface SearchBarProps {
  placeholder: string;
  lang: string;
}

export function HomeSearchBar({ placeholder }: SearchBarProps) {
  const [radius, setRadius] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  function handleRadiusChange(e: number[]) {
    setRadius(e[0]);
  }

  async function handleSelectValue(e: string) {
    nprogressStart();
    const { lat, lng, formattedAddress } = await getCoordinates(e);

    const urlParams = new URLSearchParams({
      lat: `${lat}`.slice(0, 7),
      lng: `${lng}`.slice(0, 7),
      address: formattedAddress,
      radius: `${radius}`,
    });

    urlParams.sort();

    router.push(`/map?${urlParams.toString()}`);
  }

  function handleQueryChagne(e: string) {
    setQuery((_prev) => e);
  }

  return (
    <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2">
      <FilterButton handleChange={handleRadiusChange} radius={radius} />
      <div className="mx-auto flex-1">
        <div className="relative">
          <LocationSearch
            query={query}
            onQueryChange={handleQueryChagne}
            onSelectValue={handleSelectValue}
            errorText={'Something went wrong'}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
