'use client';

import {
  GOOGLE_MAPS_GEOCODING_ENDPOINT,
  GOOGLE_MAPS_GEOLOCATION_ENDPOINT,
} from '@/config/apiEndpoints';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Coordinates = {
  lat: number | null;
  lng: number | null;
};

type LocationData = {
  city: string | null;
  region: string | null;
  countryCode: string | null;
} & Coordinates;

interface LocationContextType extends LocationData {
  isLoading: boolean;
  error: string | null;
  setLocation: (location: Partial<LocationData>) => void;
  refetch: () => Promise<void>;
}

interface LocationProviderProps {
  children: ReactNode;
}

const initialLocationState: LocationData = {
  city: null,
  region: null,
  countryCode: null,
  lat: null,
  lng: null,
};

const LocationContext = createContext<LocationContextType | null>(null);

export function useLocationApproximation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      'useLocationApproximation must be used within a LocationProvider',
    );
  }

  return context;
}

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export function LocationProvider({ children }: LocationProviderProps) {
  const [locationData, setLocationData] =
    useState<LocationData>(initialLocationState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setLocation = useCallback((location: Partial<LocationData>) => {
    setLocationData((prev) => ({
      ...prev,
      ...location,
    }));
  }, []);

  const getBrowserLocation = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  }, []);

  const getGoogleGeolocation = useCallback(async () => {
    const response = await fetch(
      `${GOOGLE_MAPS_GEOLOCATION_ENDPOINT}?key=${GOOGLE_MAPS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to get location from Google Geolocation API');
    }

    const data = await response.json();
    return {
      latitude: data.location.lat,
      longitude: data.location.lng,
      accuracy: data.accuracy,
    };
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    const response = await fetch(
      `${GOOGLE_MAPS_GEOCODING_ENDPOINT}?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Failed to reverse geocode location');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results[0]) {
      throw new Error('No results found for this location');
    }

    const addressComponents = data.results[0].address_components;
    let city = null;
    let region = null;
    let countryCode = null;

    for (const component of addressComponents) {
      if (component.types.includes('locality')) {
        city = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        region = component.long_name;
      } else if (component.types.includes('country')) {
        countryCode = component.short_name;
      }
    }

    return { city, region, countryCode };
  }, []);

  const fetchUserLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let coords;
      try {
        const position = await getBrowserLocation();
        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch {
        coords = await getGoogleGeolocation();
      }

      const geocodeResult = await reverseGeocode(
        coords.latitude,
        coords.longitude,
      );

      setLocationData({
        ...geocodeResult,
        lat: coords.latitude,
        lng: coords.longitude,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch location data';
      setError(errorMessage);
      console.error('Location fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getBrowserLocation, getGoogleGeolocation, reverseGeocode]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  const contextValue: LocationContextType = {
    ...locationData,
    isLoading,
    error,
    setLocation,
    refetch: fetchUserLocation,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}
