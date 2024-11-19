'use client';

import { useThemeContext } from '@/app/context/ThemeProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/types';
import { useTheme } from 'next-themes';

const availableThemeColors = [
  { name: 'Rose', light: 'bg-[#c27082]', dark: 'bg-[#c27082]' },
  { name: 'Blue', light: 'bg-[#3366cc]', dark: 'bg-[#3b82f6]' },
  { name: 'Green', light: 'bg-[#4db372]', dark: 'bg-[#70c28e]' },
  { name: 'Orange', light: 'bg-[#c7916b]', dark: 'bg-[#b96d46]' },
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex item-center space-x-3">
          <div
            className={cn(
              'rounded-full',
              'w-[20px]',
              'h-[20px]',
              theme === 'light' ? light : dark,
            )}
          ></div>
          <div>{name}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as ThemeColors)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="ring-offset-transparent focus:ring-transparent">
        <SelectValue placeholder="Select Color" />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
}
