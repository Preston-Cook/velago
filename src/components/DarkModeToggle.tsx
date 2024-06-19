'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { v4 as uuid } from 'uuid';
import { capitalizeString } from '@/lib/utils';
import DarkModeIcon from '../../public/images/logo-light.png';
import LightModeIcon from '../../public/images/logo-black.png';
import { useEffect } from 'react';

const themes = ['light', 'dark', 'system'];

export function DarkModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  useEffect(
    function () {
      // query dom for both favicons
      const faviconLinks = document.querySelectorAll("link[rel~='icon']");

      // set src based on resolved theme
      faviconLinks.forEach(
        (el) =>
          ((el as HTMLLinkElement).href =
            resolvedTheme === 'dark' ? DarkModeIcon.src : LightModeIcon.src),
      );
    },
    [resolvedTheme],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="transition-colors-none h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="transition-colors-none absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[8000] flex flex-col gap-1 border border-input"
        align="start"
      >
        {themes.map((themeType) => (
          <DropdownMenuItem
            className={`${themeType === theme && 'bg-accent'}`}
            key={uuid()}
            onClick={() => setTheme(themeType)}
          >
            {capitalizeString(themeType)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
