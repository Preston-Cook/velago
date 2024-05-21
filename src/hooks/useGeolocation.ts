import { useState } from 'react';

interface UseGeolocationProps {
  defaultPosition: {
    latitude: number;
    longitude: number;
  } | null;
}

/**
 * Adapted from Jonas Schmedtmann here:
 * https://github.com/jonasschmedtmann/ultimate-react-course/blob/main/11-worldwise/final/src/hooks/useGeolocation.js
 */
export function useGeolocation({ defaultPosition }: UseGeolocationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}
