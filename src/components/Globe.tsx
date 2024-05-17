'use client';

import { useRef } from 'react';
import createGlobe from 'cobe';
import { useEffect } from 'react';
import { LegacyRef } from 'react';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      className="mt-[15vh]"
      ref={canvasRef as LegacyRef<HTMLCanvasElement>}
      style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
    />
  );
}
