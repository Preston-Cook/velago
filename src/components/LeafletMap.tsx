'use client';

import { defaultCoords } from '@/config/misc';
import { useResourceContext } from '@/context/ResourceProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Point } from '@/types';
import { useEffect } from 'react';
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
  // const numResources = Number(getQueryParam('num_resources'));
  // const serviceCategories = getQueryParam('resource_types')?.split(',');

  const urlLat = getQueryParam('lat');
  const urlLng = getQueryParam('lng');

  const centerLat = urlLat !== null ? Number(urlLat) : defaultCoords.latitude;
  const centerLng = urlLng !== null ? Number(urlLng) : defaultCoords.longitude;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={15}
      className="z-[40] h-full w-full"
    >
      <MapUpdater latitude={centerLat} longitude={centerLng} />
      {resources.map((resource) => (
        <MapMarker resource={resource} key={uuid()} />
      ))}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
