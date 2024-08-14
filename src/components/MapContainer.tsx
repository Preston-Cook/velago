'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from './Spinner';

interface MapContainerProps {
  lat: number;
  lng: number;
  isUsingGeolocationLoc: boolean | null;
}

export function MapContainer({
  lat,
  lng,
  isUsingGeolocationLoc,
}: MapContainerProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    [],
  );

  return (
    <main className="flex h-[90.5vh] flex-1 flex-col gap-4 overflow-y-hidden p-4 lg:gap-6">
      <div
        className="flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {isUsingGeolocationLoc === null || !lat || !lng ? (
          <Spinner />
        ) : (
          <Map lat={lat} lng={lng} />
        )}
      </div>
    </main>
  );
}
