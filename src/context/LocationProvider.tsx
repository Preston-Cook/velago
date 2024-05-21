'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface LocationContextType {
  ip: string | null;
  city: string | null;
  region: string | null;
  latitude: string | null;
  longitude: string | null;
}

interface LocationContextProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationContextType | null>({
  ip: null,
  city: null,
  region: null,
  latitude: null,
  longitude: null,
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

        const { ip, city, region, latitude, longitude } = data;
        setUserLocation({
          ip,
          city,
          region,
          latitude,
          longitude,
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
