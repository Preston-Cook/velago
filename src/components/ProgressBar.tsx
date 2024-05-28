'use client';

import { useTheme } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [isClient, setIsClient] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(function () {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <NextTopLoader
        height={1}
        showSpinner={false}
        color={resolvedTheme === 'dark' ? '#3b82f6' : '#2563eb'}
      />
    )
  );
}
