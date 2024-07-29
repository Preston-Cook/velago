'use client';

import { useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useEffect } from 'react';
import { LegacyRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Spinner } from './Spinner';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let phi = 0;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.141, 0.39, 0.922],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    setIsLoading(false);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex h-[500px] w-[500px] flex-col justify-center">
          <Spinner className="mx-auto" />
        </div>
      ) : (
        <canvas
          className="w-auto bg-transparent"
          ref={canvasRef as LegacyRef<HTMLCanvasElement>}
          style={{ width: 500, height: 500, maxWidth: '100%', aspectRatio: 1 }}
        />
      )}
    </>
  );
}
