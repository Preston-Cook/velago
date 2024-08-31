'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { RecenterMap } from './RecenterMap';

interface MapProps {
  lat: number;
  lng: number;
}

const icon = L.icon({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [30, 47.5],
  shadowSize: [0, 0],
});

export default function Map({ lat, lng }: MapProps) {
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
      <Marker icon={icon} position={[lat, lng]} />
      <Marker
        icon={icon}
        position={[lat - Math.random(), lng - Math.random()]}
      />
      <Marker
        icon={icon}
        position={[lat + Math.random(), lng + Math.random()]}
      />
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
}
