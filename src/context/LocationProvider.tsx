'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface LocationApproximationContextType {
  city: string | null;
  region: string | null;
  countryCode: string | null;
  lat: string | null;
  lng: string | null;
  setLocation: (location: Partial<LocationApproximationContextType>) => void;
}

interface LocationContextProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationApproximationContextType | null>({
  city: null,
  region: null,
  countryCode: null,
  lat: null,
  lng: null,
  setLocation: () => {},
});

export function useLocationApproximation() {
  const location = useContext(LocationContext);
  return location;
}

export function LocationProvider({ children }: LocationContextProviderProps) {
  const [userLocationApproximation, setUserLocationApproximation] = useState<
    Omit<LocationApproximationContextType, 'setLocation'>
  >({
    city: null,
    region: null,
    countryCode: null,
    lat: null,
    lng: null,
  });

  const setLocation = (location: Partial<LocationApproximationContextType>) => {
    setUserLocationApproximation((prevLocation) => ({
      ...prevLocation,
      ...location,
    }));
  };

  useEffect(() => {
    const fetchUserLocationApproximation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch user location');
        }
        const data = await response.json();

        const {
          city,
          region,
          country_code_iso3: countryCode,
          latitude: lat,
          longitude: lng,
        } = data;

        setUserLocationApproximation({
          city,
          region,
          countryCode,
          lat,
          lng,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserLocationApproximation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ ...userLocationApproximation, setLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}
