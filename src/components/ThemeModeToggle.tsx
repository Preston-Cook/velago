'use client';

import { Button } from '@/components/ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

interface ThemeModeToggleProps {
  className?: string;
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const t = useTranslations('Components.ThemeModeToggle');
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="hidden dark:inline-block" />
      <Moon className="dark:hidden" />
      <span className="sr-only">{t('sr')}</span>
    </Button>
  );
}
