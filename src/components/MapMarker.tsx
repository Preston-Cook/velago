import { Resource } from '@/types';
import { Marker } from 'react-leaflet';
import { MapMarkerPopup } from './MapMarkerPopup';

interface MapMarkerProps {
  resource: Resource;
}

export function MapMarker({ resource }: MapMarkerProps) {
  const { latitude, longitude, serviceAtLocation } = resource;

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

  return (
    <Marker position={[latitude, longitude]}>
      <MapMarkerPopup />
    </Marker>
  );
}
