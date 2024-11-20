import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Filter } from 'lucide-react';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Slider } from './ui/Slider';

interface FilterButtonProps {
  radius: number;
  handleChange(e: number[]): void;
}

export function FilterButton({ handleChange, radius }: FilterButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-[45px] text-white">
          <Filter className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1 w-80 bg-background" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold text-primary">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Set Filters for Search
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-left text-sm" htmlFor="width">
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
