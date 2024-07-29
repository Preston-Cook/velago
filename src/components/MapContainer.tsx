'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from './Spinner';

interface MapContainerProps {
  lat: number;
  lng: number;
}

export function MapContainer({ lat, lng }: MapContainerProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    [],
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div
        className="flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {!lat || !lng ? <Spinner /> : <Map lat={lat} lng={lng} />}
      </div>
    </main>
  );
}
