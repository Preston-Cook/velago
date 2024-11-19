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
      <Sun className="hidden dark:inline-block" />
      <Moon className="dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
