'use client';

import { serviceCategories } from '@/config/misc';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ResourceData } from '@/types';
import { useEffect, useState } from 'react';
import { MapContainer } from './MapContainer';
import { MapHeader } from './MapHeader';
import { MapSidebar } from './MapSidebar';

export function MapDashboard() {
  const { setQueryParam, getQueryParam } = useQueryParams();

  const radius = getQueryParam('radius');
  const numResources = getQueryParam('num_resources');
  const resourceTypes = getQueryParam('resource_types');
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(false);

  useEffect(function () {
    async function fetchResources() {
      setIsLoadingResources(true);
      const res = await fetch('/api/resources');
      const { data } = await res.json();
      setIsLoadingResources(false);
      setResources(data);
    }

    fetchResources();
  }, []);

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
    <div className="-m-4 flex h-[80vh] bg-secondary">
      <MapSidebar />
      <div className="flex flex-1 flex-col">
        <MapHeader />
        <MapContainer
          isLoadingResources={isLoadingResources}
          resources={resources}
        />
      </div>
    </div>
  );
}
