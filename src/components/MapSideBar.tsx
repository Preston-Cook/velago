import { useQueryParams } from '@/hooks/useQueryParams';
import {
  HeartHandshake,
  MapIcon,
  MapPin,
  MessageSquareText,
  SlidersHorizontal,
} from 'lucide-react';
import { FilterAccordion } from './FilterAccordion';
import { SendMessageButton } from './SendMessageButton';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';

export function MapSidebar() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const radius = Number(getQueryParam('radius'));
  const numResources = Number(getQueryParam('num_resources'));

  function handleRadiusChange(e: number[]) {
    setQueryParam('radius', `${e[0]}`);
  }

  function handleNumResourcesChange(e: number[]) {
    setQueryParam('num_resources', `${e[0]}`);
  }

  return (
    <div className="hidden h-[90.75vh] border-r border-primary bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex max-h-14 min-h-14 items-center border-b border-primary px-4 lg:h-[60px] lg:px-6">
          <div className="ml-2 flex items-center gap-2 font-semibold">
            <MapIcon className="h-6 w-6" />
            <span className="text-xl">Map Options</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">
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
            <FilterAccordion isMapSidebar={true} />
          </nav>
          <Separator className="my-4 bg-primary" />
          <nav className="mx-4 grid items-start px-2 text-sm font-medium lg:px-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg">
              <MapPin />
              <span>Resources</span>
            </h3>
            <Separator />
            <p className="my-4">No Selected Resources</p>
          </nav>
          <Separator className="my-4 bg-primary" />
          <nav className="mx-4 grid items-start px-2 text-sm font-medium lg:px-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg">
              <MessageSquareText />
              <span>Send Message</span>
            </h3>
            <Separator />
            <div className="my-4">
              <SendMessageButton />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
