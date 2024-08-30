'use client';

import { FilterMenu } from '@/components/FilterMenu';
import { MapContainer } from '@/components/MapContainer';
import { MapSidebar } from '@/components/MapSideBar';
import { useLocationApproximation } from '@/context/LocationProvider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { reverseGeocode } from '@/lib/reverseGeocode';
import { useEffect, useState } from 'react';
import { GeolocationPrompt } from './GeolocationPrompt';
import { MapSearchBar } from './MapSearchBar';

interface MapDashBoardProps {
  placeholder: string;
}

export function MapDashboard({ placeholder }: MapDashBoardProps) {
  const loc = useLocationApproximation();
  const { getQueryParam, setQueryParam } = useQueryParams();

  const [userLocation, setUserLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const [isUsingGeolocationLoc, setIsUsingGeolocationLoc] = useState<
    boolean | null
  >(null);

  const address = getQueryParam('address');
  const lat = Number(getQueryParam('lat'));
  const lng = Number(getQueryParam('lng'));
  const radius = Number(getQueryParam('radius')) || 10;
  const numResources = Number(getQueryParam('num_resources')) || 5;

  useEffect(() => {
    setQueryParam('radius', radius.toString());
    setQueryParam('num_resources', numResources.toString());
  }, [radius, numResources, setQueryParam]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
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
        },
        () => setIsUsingGeolocationLoc(false),
      );
    }
  }, []);

  useEffect(() => {
    const updateQueryParams = (loc: any, userLocation: any) => {
      if (userLocation && isUsingGeolocationLoc) {
        const {
          address: geocodeAddress,
          lat: geocodeLat,
          lng: geocodeLng,
        } = userLocation;
        setQueryParam('address', geocodeAddress);
        setQueryParam('lat', `${geocodeLat}`);
        setQueryParam('lng', `${geocodeLng}`);
      } else if (
        loc?.city &&
        loc?.region &&
        loc?.countryCode &&
        loc?.lat &&
        loc?.lng
      ) {
        if (!address) {
          setQueryParam(
            'address',
            `${loc.city}, ${loc.region}, ${loc.countryCode}`,
          );
        }
        if (!lat) setQueryParam('lat', `${loc.lat}`);
        if (!lng) setQueryParam('lng', `${loc.lng}`);
      }
    };

    updateQueryParams(loc, userLocation);
  }, [
    loc,
    address,
    lat,
    lng,
    setQueryParam,
    userLocation,
    isUsingGeolocationLoc,
  ]);

  return (
    <div className="grid h-[90.75vh] w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <GeolocationPrompt
        isOpenPrompt={userLocation !== null && isUsingGeolocationLoc === null}
        onUseCurrentLocationSelection={setIsUsingGeolocationLoc}
      />
      <MapSidebar />
      <div className="flex flex-col">
        <header className="flex max-h-14 min-h-14 items-center gap-4 border-b border-primary bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <FilterMenu />
          <div className="w-full flex-1">
            <div className="relative">
              <MapSearchBar
                placeholder={placeholder}
                onUseCurrentLocationSelection={setIsUsingGeolocationLoc}
              />
            </div>
          </div>
        </header>
        <MapContainer
          lat={lat}
          lng={lng}
          isUsingGeolocationLoc={isUsingGeolocationLoc}
        />
      </div>
    </div>
  );
}
