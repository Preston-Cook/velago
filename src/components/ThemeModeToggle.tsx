'use client';

import { Button } from '@/components/ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeModeToggleProps {
  className?: string;
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun
        className="h-[1.2rem] transition-none w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90
          dark:scale-0"
      />
      <Moon
        className="absolute transition-none h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
          dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
