'use client';
import { setGlobalColorTheme } from '@/lib/setGlobalColorTheme';
import type { ThemeColors, ThemeColorStateParams } from '@/types';
import type { ThemeProviderProps } from 'next-themes';
import { useTheme } from 'next-themes';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams,
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem('themeColor') as ThemeColors) || 'Blue';
    } catch {
      return 'Blue' as ThemeColors;
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors,
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    setGlobalColorTheme(theme as 'light' | 'dark', themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
