'use client';

import { Filter } from 'lucide-react';
import { MapSidebarFilters } from './MapSidebarFilters';

export function MapSidebar() {
  return (
    <aside className="hidden w-[250px] overflow-y-scroll border border-r-primary bg-background md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-[72px] flex-col justify-center border border-b-primary border-l-transparent border-r-transparent border-t-transparent bg-secondary p-4">
          <div className="flex items-center justify-start gap-2">
            <Filter />
            <h2 className="text-xl">Filters</h2>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 bg-secondary">
          <MapSidebarFilters />
        </div>
      </div>
    </aside>
  );
}
