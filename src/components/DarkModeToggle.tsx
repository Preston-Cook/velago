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

const themes = ['light', 'dark', 'system'];

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();

  const currentTheme = theme || 'system';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-input" align="end">
        {themes.map((themeType) => (
          <DropdownMenuItem
            className={`${themeType === currentTheme && 'bg-accent'}`}
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
