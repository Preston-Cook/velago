import { mapIconSize, serviceCategoryIcons } from '@/config/misc';
import { Resource } from '@/types';
import L from 'leaflet';
import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MapMarkerPopupContent } from './MapMarkerPopupContent';

interface MapMarkerProps {
  resource: Resource;
}

export function MapMarker({ resource }: MapMarkerProps) {
  const { latitude, longitude, serviceAtLocation } = resource;
  const [serviceAtLocationIdx, setServiceAtLocationIdx] = useState(0);

  if (latitude === null || longitude === null) {
    console.error('Invalid latitude or longitude for resource:', {
      latitude,
      longitude,
    });
    return null;
  }

  if (serviceAtLocation.length === 0) {
    console.error('There must be at least one valid service at the location');
    return null;
  }

  const { service } = serviceAtLocation[serviceAtLocationIdx];

  if (!service) {
    console.error(
      'There is no service associated with this Service at Location',
    );
    return null;
  }

  const { category } = service;

  const iconName =
    serviceCategoryIcons[category as keyof typeof serviceCategoryIcons];

  const iconUrl = `/images/${iconName}.png`;

  const icon = L.icon({
    iconSize: [mapIconSize, mapIconSize],
    iconUrl,
  });

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      <Popup minWidth={325} maxHeight={400} closeButton={false}>
        <MapMarkerPopupContent
          resource={resource}
          serviceAtLocationIdx={serviceAtLocationIdx}
          handleBackClick={() => setServiceAtLocationIdx((prev) => prev - 1)}
          handleForwardClick={() => setServiceAtLocationIdx((prev) => prev + 1)}
        />
      </Popup>
    </Marker>
  );
}
