'use client';

import { ResourceData } from '@/types';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from './Spinner';

interface MapContainerProps {
  resources: ResourceData[];
  isLoadingResources: boolean;
}

export function MapContainer({ isLoadingResources }: MapContainerProps) {
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
        {isLoadingResources ? <Spinner size={2} /> : <LeafletMap />}
      </div>
    </>
  );
}
