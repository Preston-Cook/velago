'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface LocationCoordinate {
  latitude: number;
  longitude: number;
}

interface LocationCoordinatesContextType {
  coordinates: LocationCoordinate[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const LocationCoordinatesContext =
  createContext<LocationCoordinatesContextType>({
    coordinates: [],
    isLoading: true,
    error: null,
    refetch: () => {},
  });

const CACHE_KEY = 'location_coordinates';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const LocationCoordinatesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [coordinates, setCoordinates] = useState<LocationCoordinate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoordinates = async (forceFetch = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (!forceFetch && cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);

        // Check if cache is still valid
        if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
          setCoordinates(data);
          setIsLoading(false);
          return data;
        }
      }

      const response = await fetch('/api/location/coordinates');

      if (!response.ok) {
        throw new Error('Failed to fetch location coordinates');
      }

      const fetchedData = await response.json();

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: fetchedData,
          timestamp: Date.now(),
        }),
      );

      setCoordinates(fetchedData);
      setIsLoading(false);
      return fetchedData;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred'),
      );
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const refetch = () => fetchCoordinates(true);

  return (
    <LocationCoordinatesContext.Provider
      value={{
        coordinates,
        isLoading,
        error,
        refetch,
      }}
    >
      {children}
    </LocationCoordinatesContext.Provider>
  );
};

export const useLocationCoordinates = () => {
  const context = useContext(LocationCoordinatesContext);

  if (!context) {
    throw new Error(
      'useLocationCoordinates must be used within a LocationCoordinatesProvider',
    );
  }

  return context;
};
