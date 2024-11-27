'use client';

import { useThemeContext } from '@/app/context/ThemeProvider';
import { colorThemes } from '@/config/colorThemes';
import { hslToRgb } from '@/lib/hslToRgb';
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

// https://github.com/shuding/cobe

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Specify the type here
  const { themeColor } = useThemeContext();
  const { resolvedTheme } = useTheme();
  const color =
    colorThemes[themeColor][resolvedTheme as 'light' | 'dark'].primary;

  const [h, s, l] = color.split(' ').map((el) => Number(el.replace('%', '')));

  const rgbColors = hslToRgb(h, s, l);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) {
      return;
    }

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: rgbColors,
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [themeColor, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: '1' }}
    />
  );
}
