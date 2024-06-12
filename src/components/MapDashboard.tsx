'use client';

import { MapContainer } from '@/components/MapContainer';
import { FilterMenu } from '@/components/FilterMenu';
import { MapSidebar } from '@/components/MapSideBar';
import { useEffect } from 'react';
import { useLocationApproximation } from '@/context/LocationProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { MapSearchBar } from './MapSearchBar';

interface MapDashBoardProps {
  placeholder: string;
}

export function MapDashboard({ placeholder }: MapDashBoardProps) {
  const loc = useLocationApproximation();

  // get params from url
  const { getQueryParam, setQueryParam } = useQueryParams();

  const address = getQueryParam('address');
  const lat = Number(getQueryParam('lat'));
  const lng = Number(getQueryParam('lng'));
  const radius = Number(getQueryParam('radius'));

  useEffect(
    function () {
      if (!radius) {
        setQueryParam('radius', `${10}`);
      }

      if (!loc) return;

      const {
        lat: latApprox,
        lng: lngApprox,
        city: cityApprox,
        region: regionApprox,
        countryCode: countryCodeApprox,
      } = loc;

      if (!address) {
        setQueryParam(
          'address',
          `${cityApprox}, ${regionApprox}, ${countryCodeApprox}`,
        );
      }

      if (!lat) {
        setQueryParam('lat', `${latApprox}`);
      }

      if (!lng) {
        setQueryParam('lng', `${lngApprox}`);
      }
    },

    [loc, address, lat, lng, radius, setQueryParam],
  );

  function handleRadiusChange(e: number[]) {
    setQueryParam('radius', `${e[0]}`);
  }

  return (
    <div className="grid min-h-[90.8vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MapSidebar radius={radius} onRadiusChange={handleRadiusChange} />
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-primary bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <FilterMenu radius={radius} onRadiusChange={handleRadiusChange} />
          <div className="w-full flex-1">
            <div className="relative">
              <MapSearchBar placeholder={placeholder} />
            </div>
          </div>
        </header>
        <MapContainer lat={lat} lng={lng} />
      </div>
    </div>
  );
}
