import { Filter } from 'lucide-react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface MapSidebarProps {
  radius: number;
  onRadiusChange(e: number[]): void;
}

export function MapSidebar({ radius, onRadiusChange }: MapSidebarProps) {
  return (
    <div className="hidden border-r border-primary bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-primary px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold ml-2">
            <Filter className="h-6 w-6" />
            <span className="text-xl">Filters</span>
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="my-2">
              <Label>Radius: 10 mi.</Label>
              <Slider
                value={[radius]}
                name="radius"
                defaultValue={[10]}
                onValueChange={onRadiusChange}
                min={1}
                max={25}
                step={5}
                className="mt-4"
              />
            </div>
            <div className="mt-4">
              <Label>Number of Resources: 4</Label>
              <Slider className="mt-4" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
