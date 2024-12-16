'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

export default function LeafletMap() {
  return (
    <MapContainer
      center={[30.2672, -97.7431]}
      zoom={15}
      className="z-[40] h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
