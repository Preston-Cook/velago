'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { MapSidebar } from './MapSidebar';
import { Spinner } from './Spinner';

export function MapDashboard() {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('@/components/LeafletMap'), {
        loading: () => <Spinner size={10} />,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <MapSidebar />
      <div className="w-full bg-secondary">
        <LeafletMap />
      </div>
    </>
  );
}
