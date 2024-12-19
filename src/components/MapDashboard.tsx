'use client';

import { serviceCategories } from '@/config/misc';
import { useLocationApproximation } from '@/context/LocationProvider';
import { ResourceProvider } from '@/context/ResourceProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useEffect } from 'react';
import { MapContainer } from './MapContainer';
import { MapHeader } from './MapHeader';
import { MapSidebar } from './MapSidebar';

export function MapDashboard() {
  const { setQueryParamPriority, getQueryParam } = useQueryParams();
  const {
    lat: approximateLat,
    lng: approximateLng,
    region,
    city,
    isLoading: isLoadingApproximate,
  } = useLocationApproximation();
  const radius = getQueryParam('radius');
  const numResources = getQueryParam('num_resources');
  const resourceTypes = getQueryParam('resource_types');
  const lat = getQueryParam('lat');
  const lng = getQueryParam('lng');
  const address = getQueryParam('address');

  useEffect(
    function () {
      if (!radius) {
        setQueryParamPriority('radius', '10');
      }

      if (!numResources) {
        setQueryParamPriority('num_resources', '10');
      }

      if (resourceTypes === null) {
        setQueryParamPriority(
          'resource_types',
          [...serviceCategories].sort().join(','),
        );
      }

      if (!address) {
        setQueryParamPriority('address', `${city}, ${region}`);
      }

      if (!lat && !isLoadingApproximate) {
        setQueryParamPriority('lat', `${approximateLat as number}`);
      }

      if (!lng && !isLoadingApproximate) {
        setQueryParamPriority('lng', `${approximateLng as number}`);
      }
    },
    [
      radius,
      numResources,
      resourceTypes,
      setQueryParamPriority,
      approximateLat,
      approximateLng,
      isLoadingApproximate,
      lat,
      lng,
      city,
      region,
      address,
    ],
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
