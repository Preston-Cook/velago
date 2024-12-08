'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

export default function LeafletMap() {
  return (
    <MapContainer
      center={[30.269501, -97.715942]}
      zoom={10}
      className="z-[40] h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
