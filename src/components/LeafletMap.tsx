'use client';

import { defaultCoords, serviceCategories } from '@/config/misc';
import { useResourceContext } from '@/context/ResourceProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { filterResources } from '@/lib/filterResources';
import { haversineDistance } from '@/lib/haversineDistance';
import { Point } from '@/types';
import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { MapMarker } from './MapMarker';

function MapUpdater({ latitude, longitude }: Point) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude]);
  }, [latitude, longitude, map]);

  return null;
}

export default function LeafletMap() {
  const { resources } = useResourceContext();
  const { getQueryParam } = useQueryParams();

  const urlLat = getQueryParam('lat');
  const urlLng = getQueryParam('lng');
  const urlRadius = getQueryParam('radius');
  const urlResourceTypes = getQueryParam('resource_types');
  const urlNumResources = getQueryParam('num_resources');

  const centerLat = urlLat !== null ? Number(urlLat) : defaultCoords.latitude;
  const centerLng = urlLng !== null ? Number(urlLng) : defaultCoords.longitude;

  const radius = urlRadius !== null ? Number(urlRadius) : 10;

  const resourceTypes =
    urlResourceTypes !== null ? urlResourceTypes.split(',') : serviceCategories;

  const numResources = urlNumResources !== null ? Number(urlNumResources) : 10;

  const distanceMap = useMemo(() => {
    const map = new Map<string, number>();

    for (const resource of resources) {
      const dist = haversineDistance({
        point1: { latitude: centerLat, longitude: centerLng },
        point2: { latitude: resource.latitude, longitude: resource.longitude },
      });
      map.set(resource.id, dist);
    }

    return map;
  }, [resources, centerLat, centerLng]);

  const filteredResources = filterResources({
    hashmap: distanceMap,
    resources,
    radius,
    resourceTypes: resourceTypes.slice(),
    numResources,
    mapCenter: { latitude: centerLat, longitude: centerLng },
  });

  return (
    <MapContainer
      zoomControl={false}
      center={[centerLat, centerLng]}
      zoom={15}
      className="z-[40] h-full w-full"
    >
      <MapUpdater latitude={centerLat} longitude={centerLng} />
      {filteredResources.map((resource) => (
        <MapMarker resource={resource} key={uuid()} />
      ))}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
