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
}

export function FilterButton({ radius }: FilterButtonProps) {
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
              <Label htmlFor="width">Radius: {radius}mi.</Label>

              <Slider className="col-span-2" defaultValue={[10]} max={25} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
