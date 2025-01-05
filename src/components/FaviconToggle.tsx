'use client';

import { faviconUrls } from '@/config/misc';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

type ThemeType = 'light' | 'dark';

export function FaviconToggle() {
  const { resolvedTheme } = useTheme();

  useEffect(
    function () {
      if (!resolvedTheme) return;

      let el = document.querySelector("link[rel~='icon']");

      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'icon');
        el.setAttribute('type', 'image/png');
      }

      el.setAttribute('href', faviconUrls[resolvedTheme as ThemeType]);

      document.head.appendChild(el);
    },
    [resolvedTheme],
  );

  return null;
}
