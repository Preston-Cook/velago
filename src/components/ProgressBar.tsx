'use client';

import { colorThemes } from '@/config/colorThemes';
import { useThemeContext } from '@/context/ThemeProvider';
import { hslToHex } from '@/lib/hslToHex';
import { useTheme } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [isClient, setIsClient] = useState(false);
  const { themeColor } = useThemeContext();
  const { resolvedTheme } = useTheme();
  const color =
    colorThemes[themeColor][resolvedTheme as 'light' | 'dark'].primary;

  const [h, s, l] = color.split(' ').map((el) => Number(el.replace('%', '')));

  const hexColor = hslToHex(h, s, l);

  useEffect(function () {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <NextTopLoader color={hexColor} height={1} showSpinner={false} />
    )
  );
}
