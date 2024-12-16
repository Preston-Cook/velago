'use client';

import { defaultCoords } from '@/config/misc';
import { useLocationApproximation } from '@/context/LocationProvider';
import { useResourceContext } from '@/context/ResourceProvider';
import { calculateGeographicMidpoint } from '@/lib/calculateGeographicMidpoint';
import { MapContainer, TileLayer } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import { MapMarker } from './MapMarker';

export default function LeafletMap() {
  const { resources } = useResourceContext();
  const { lat, lng } = useLocationApproximation();

  const coords = resources.map(({ latitude, longitude }) => ({
    latitude,
    longitude,
  }));

  const res = calculateGeographicMidpoint({ coords });

  let center: [number, number] | null = null;

  if (coords.length > 0 && res?.latitude && res?.longitude) {
    center = [res.latitude, res.longitude];
  }

  if (!center && lat !== null && lng !== null) {
    center = [lat, lng];
  }

  if (!center) {
    center = [defaultCoords.latitude, defaultCoords.longitude];
  }

  return (
    <MapContainer center={center} zoom={15} className="z-[40] h-full w-full">
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
