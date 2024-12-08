import { searchPlaceholders } from '@/config/misc';
import { useMemo } from 'react';
import { FilterMenu } from './FilterMenu';
import { MapSearchBar } from './MapSearchBar';

export function MapHeader() {
  const placeholder = useMemo(() => {
    return searchPlaceholders[
      Math.floor(Math.random() * searchPlaceholders.length)
    ];
  }, []);

  return (
    <div className="w-full border border-b-primary bg-background p-4">
      <div className="flex items-center justify-center gap-4">
        <FilterMenu className="md:hidden" />
        <div className="hidden h-[40px] md:block" />
        <div className="relative w-full max-w-[500px]">
          <MapSearchBar placeholder={placeholder} />
        </div>
      </div>
    </div>
  );
}
