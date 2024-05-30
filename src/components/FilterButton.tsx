import { Button } from './ui/button';
import { Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface FilterButtonProps {
  radius: number;
  handleChange(e: number[]): void;
}

export function FilterButton({ handleChange, radius }: FilterButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-white h-[45px]">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-primary font-bold">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Set Filters for Search
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-sm text-left" htmlFor="width">
                Radius: <br />
                &lt; {radius}mi.
              </Label>
              <Slider
                onValueChange={handleChange}
                step={5}
                className="col-span-2 hover:cursor-pointer"
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
