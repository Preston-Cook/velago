import { colorThemes } from '@/config/colorThemes';
import { ThemeColors } from '@/types';

export function setGlobalColorTheme(
  themeMode: 'light' | 'dark',
  color: ThemeColors,
) {
  const theme = colorThemes[color][themeMode];

  for (const key in theme) {
    document.documentElement.style.setProperty(
      `--${key}`,
      theme[key as keyof typeof theme],
    );
  }
}
