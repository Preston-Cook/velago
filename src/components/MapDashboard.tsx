'use client';

import { MapContainer } from '@/components/MapContainer';
import { FilterMenu } from '@/components/FilterMenu';
import { MapSidebar } from '@/components/MapSideBar';
import { useEffect, useState } from 'react';
import { useLocationApproximation } from '@/context/LocationProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { MapSearchBar } from './MapSearchBar';
import { reverseGeocode } from '@/lib/reverseGeocode';

interface MapDashBoardProps {
  placeholder: string;
}

export function MapDashboard({ placeholder }: MapDashBoardProps) {
  const loc = useLocationApproximation();

  const [userLocation, setUserLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  // get params from url
  const { getQueryParam, setQueryParam } = useQueryParams();

  const address = getQueryParam('address');
  const lat = Number(getQueryParam('lat'));
  const lng = Number(getQueryParam('lng'));

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const {
            formattedAddress,
            lat: reverseGeoLat,
            lng: reverseGeoLng,
          } = await reverseGeocode({ lat: latitude, lng: longitude });
          setUserLocation({
            address: formattedAddress,
            lat: reverseGeoLat,
            lng: reverseGeoLng,
          });
        } catch (error) {
          console.error('Error reverse geocoding:', error);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const {
        lat: geocodeLat,
        lng: geocodeLng,
        address: geocodeAddress,
      } = userLocation;
      setQueryParam('address', geocodeAddress);
      setQueryParam('lat', `${geocodeLat}`);
      setQueryParam('lng', `${geocodeLng}`);
    } else if (
      loc &&
      loc.city &&
      loc.region &&
      loc.countryCode &&
      loc.lat &&
      loc.lng
    ) {
      const {
        lat: latApprox,
        lng: lngApprox,
        city: cityApprox,
        region: regionApprox,
        countryCode: countryCodeApprox,
      } = loc;

      if (!address) {
        setQueryParam(
          'address',
          `${cityApprox}, ${regionApprox}, ${countryCodeApprox}`,
        );
      }

      if (!lat) {
        setQueryParam('lat', `${latApprox}`);
      }

      if (!lng) {
        setQueryParam('lng', `${lngApprox}`);
      }
    }
  }, [loc, address, lat, lng, setQueryParam, userLocation]);

  return (
    <div className="grid min-h-[90.75vh] w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <MapSidebar />
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-primary bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* <FilterMenu radius={radius} onRadiusChange={handleRadiusChange} /> */}
          <div className="w-full flex-1">
            <div className="relative">
              <MapSearchBar placeholder={placeholder} />
            </div>
          </div>
        </header>
        <MapContainer lat={lat} lng={lng} />
      </div>
    </div>
  );
}
