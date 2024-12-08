'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
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
      <div className="w-full flex-1">
        <LeafletMap />
      </div>
    </>
  );
}
