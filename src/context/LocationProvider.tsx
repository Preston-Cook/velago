'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface LocationContextType {
  city: string | null;
  region: string | null;
  countryCode: string | null;
}

interface LocationContextProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationContextType | null>({
  city: null,
  region: null,
  countryCode: null,
});

export function useLocation() {
  const location = useContext(LocationContext);
  return location;
}

export function LocationProvider({ children }: LocationContextProviderProps) {
  const [userLocation, setUserLocation] = useState<LocationContextType | null>(
    null,
  );

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch user location');
        }
        const data = await response.json();

        const { city, region, country_code_iso3: countryCode } = data;
        setUserLocation({
          city,
          region,
          countryCode,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
}
