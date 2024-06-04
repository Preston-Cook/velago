'use client';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { RecenterMap } from './RecenterMap';
import { v4 as uuid } from 'uuid';

interface MapProps {
  lat: number;
  lng: number;
}

export default function Map({ lat, lng }: MapProps) {
  return (
    <MapContainer
      center={[30.269501, -97.715942]}
      zoom={10}
      className="h-full w-full z-20"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={uuid()} position={[lat, lng]} />
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
}
