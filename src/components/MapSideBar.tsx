import { Filter, HeartHandshake } from 'lucide-react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { FilterAccordion } from './FilterAccordion';
import { Separator } from './ui/separator';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';

export function MapSidebar() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const radius = Number(getQueryParam('radius'));
  const numResources = Number(getQueryParam('num_resources'));

  useEffect(
    function () {
      if (!radius) {
        setQueryParam('radius', '10');
      }

      if (!numResources) {
        setQueryParam('num_resources', '5');
      }
    },
    [radius, numResources, getQueryParam, setQueryParam],
  );

  function handleRadiusChange(e: number[]) {
    setQueryParam('radius', `${e[0]}`);
  }

  function handleNumResourcesChange(e: number[]) {
    setQueryParam('num_resources', `${e[0]}`);
  }

  return (
    <div className="hidden border-r border-primary bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-primary px-4 lg:h-[60px] lg:px-6">
          <div className="ml-2 flex items-center gap-2 font-semibold">
            <Filter className="h-6 w-6" />
            <span className="text-xl">Filters</span>
          </div>
        </div>
        <div className="flex-1">
          <nav className="mx-4 grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="my-2">
              <h3 className="mb-4 flex items-center gap-2 text-lg">
                <SlidersHorizontal />
                <span>Base Filters</span>
              </h3>
              <Separator className="mb-4" />
              <Label>Radius: {radius} mi.</Label>
              <Slider
                value={[radius]}
                name="radius"
                defaultValue={[10]}
                onValueChange={handleRadiusChange}
                min={1}
                max={25}
                step={5}
                className="mt-4"
              />
            </div>
            <div className="my-2">
              <div className="mt-4">
                <Label>Number of Resources: {numResources}</Label>
                <Slider
                  defaultValue={[5]}
                  min={1}
                  onValueChange={handleNumResourcesChange}
                  value={[numResources]}
                  className="mt-4"
                  max={10}
                />
              </div>
            </div>
          </nav>
          <Separator className="my-4 bg-primary" />
          <nav className="mx-4 grid items-start px-2 text-sm font-medium lg:px-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg">
              <HeartHandshake />
              <span>Resource Filters</span>
            </h3>
            <Separator />
            <FilterAccordion />
          </nav>
        </div>
      </div>
    </div>
  );
}
