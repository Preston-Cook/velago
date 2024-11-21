'use client';

import { searchPlaceholders } from '@/config/misc';
import { useRouter } from '@/i18n/routing';
import { geocodePlaceId } from '@/lib/geocodePlaceId';
import { start as nprogressStart } from 'nprogress';
import { useEffect, useState } from 'react';
import { FilterButton } from './FilterButton';
import { LocationSearch } from './LocationSearch';

interface HandleSelectValueParams {
  placeId: string;
  text: string;
}

export function HomeSearchBar() {
  const [radius, setRadius] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const [placeHolder, setPlaceholder] = useState('');

  useEffect(function () {
    const randomPlaceholder =
      searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  function handleRadiusChange(e: number[]) {
    setRadius(e[0]);
  }

  async function handleSelectValue({ placeId }: HandleSelectValueParams) {
    nprogressStart();
    const { lat, lng, formattedAddress } = await geocodePlaceId(placeId);

    const urlParams = new URLSearchParams({
      address: formattedAddress,
      lat: `${lat}`.slice(0, 7),
      lng: `${lng}`.slice(0, 7),
      radius: `${radius}`,
    });

    // @ts-expect-error This is because the pathname config doesn't include URL Search params
    router.push(`/map?${urlParams.toString()}`);
  }

  function handleQueryChagne(e: string) {
    setQuery(() => e);
  }

  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-2">
      <FilterButton handleChange={handleRadiusChange} radius={radius} />
      <div className="mx-auto flex-1">
        <div className="relative">
          <LocationSearch
            query={query}
            onQueryChange={handleQueryChagne}
            onSelectValue={handleSelectValue}
            errorText={'Something went wrong'}
            placeholder={placeHolder}
          />
        </div>
      </div>
    </div>
  );
}
