import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Slider } from './ui/Slider';

interface FilterButtonProps {
  radius: number;
  handleChange(e: number[]): void;
}

export function FilterButton({ handleChange, radius }: FilterButtonProps) {
  const t = useTranslations('Home');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-[45px] text-white">
          <Filter className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mt-1 w-80 border border-primary bg-secondary"
        align="start"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold">{t('filters.title')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('filters.subheading')}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-left text-sm" htmlFor="width">
                {t('filters.radius')}: <br />
                &lt; {radius} mi.
              </Label>
              <Slider
                onValueChange={handleChange}
                step={5}
                className="col-span-2"
                defaultValue={[10]}
                max={25}
                min={5}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
