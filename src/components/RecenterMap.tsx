import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type RecenterProps = {
  lat: number;
  lng: number;
};

export function RecenterMap({ lat, lng }: RecenterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}
