'use client';

import { colorThemes } from '@/config/colorThemes';
import { useLocationCoordinates } from '@/context/LocationCoordinatesProvider';
import { useThemeContext } from '@/context/ThemeProvider';
import { hslToRgb } from '@/lib/hslToRgb';
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { themeColor } = useThemeContext();
  const { resolvedTheme } = useTheme();
  const color =
    colorThemes[themeColor][resolvedTheme as 'light' | 'dark'].primary;
  const locationCoordinates = useLocationCoordinates();

  const memoizedLocations = useMemo(() => {
    const { coordinates } = locationCoordinates;

    const markers = coordinates.map(({ latitude, longitude }) => ({
      location: [latitude, longitude] as [number, number],
      size: 0.03,
    }));

    return markers;
  }, []);

  console.log(locationCoordinates);

  const [h, s, l] = color.split(' ').map((el) => Number(el.replace('%', '')));

  const rgbColors = hslToRgb(h, s, l);

  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(window.innerWidth * 0.8, 600); // Maximum size 600px
      setDimensions({
        width: newWidth,
        height: newWidth, // Maintain square aspect ratio
      });
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: dimensions.width * 2,
      height: dimensions.height * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: rgbColors,
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: memoizedLocations,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });

    return () => {
      globe.destroy();
    };
  }, [themeColor, resolvedTheme, dimensions, rgbColors]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto aspect-square"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        opacity: 0,
        transition: 'opacity 1s ease',
      }}
    />
  );
}
