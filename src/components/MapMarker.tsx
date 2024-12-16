import { serviceCategoryIcons } from '@/config/misc';
import { ResourceData } from '@/types';
import { Prisma } from '@prisma/client';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

interface MapMarkerProps {
  resource: ResourceData;
}

export function MapMarker({ resource }: MapMarkerProps) {
  const service: Prisma.ServiceGetPayload<{
    include: { requiredDocuments: true };
  }> | null = resource.serviceAtLocation[0].service;
  const category = service?.category as string;

  const iconName =
    serviceCategoryIcons[category as keyof typeof serviceCategoryIcons];

  const keys = Object.keys(serviceCategoryIcons);

  if (!keys.includes(category)) {
    console.log(category, '<-----');
  }

  const iconUrl = `/images/${iconName}.png`;

  const { latitude, longitude } = resource;

  const icon = L.icon({
    iconUrl,
    iconSize: [48, 48],
    iconAnchor: [12, 41],
  });

  return (
    <Marker position={[latitude as number, longitude as number]} icon={icon}>
      <Popup>{category}</Popup>
    </Marker>
  );
}
