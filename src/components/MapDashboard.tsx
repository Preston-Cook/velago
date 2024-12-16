'use client';

import { serviceCategories } from '@/config/misc';
import { ResourceProvider } from '@/context/ResourceProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useEffect } from 'react';
import { MapContainer } from './MapContainer';
import { MapHeader } from './MapHeader';
import { MapSidebar } from './MapSidebar';

export function MapDashboard() {
  const { setQueryParam, getQueryParam } = useQueryParams();

  const radius = getQueryParam('radius');
  const numResources = getQueryParam('num_resources');
  const resourceTypes = getQueryParam('resource_types');

  useEffect(
    function () {
      if (!radius) {
        setQueryParam('radius', '10');
      }

      if (!numResources) {
        setQueryParam('num_resources', '10');
      }

      if (resourceTypes === null) {
        setQueryParam(
          'resource_types',
          [...serviceCategories].sort().join(','),
        );
      }
    },
    [radius, numResources, resourceTypes, setQueryParam],
  );

  return (
    <ResourceProvider>
      <div className="-m-4 flex h-[80vh] bg-secondary">
        <MapSidebar />
        <div className="flex flex-1 flex-col">
          <MapHeader />
          <MapContainer />
        </div>
      </div>
    </ResourceProvider>
  );
}
