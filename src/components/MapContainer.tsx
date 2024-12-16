'use client';

import { useResourceContext } from '@/context/ResourceProvider';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from './Spinner';

export function MapContainer() {
  const { isLoading } = useResourceContext();

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('@/components/LeafletMap'), {
        loading: () => <Spinner size={2} />,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <div className="w-full flex-1 bg-background">
        {isLoading ? <Spinner size={2} /> : <LeafletMap />}
      </div>
    </>
  );
}
