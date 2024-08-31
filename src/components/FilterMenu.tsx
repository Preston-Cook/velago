import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQueryParams } from '@/hooks/useQueryParams';
import {
  Filter,
  HeartHandshake,
  MapIcon,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';
import { FilterAccordion } from './FilterAccordion';
import { SendMessageButton } from './SendMessageButton';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';

export function FilterMenu() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 border-none md:hidden"
        >
          <Filter className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[60vh] flex-col overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2 font-semibold">
              <MapIcon className="h-6 w-6" />
              <span className="text-xl">Map Options</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Edit the following fields to filter resources and connect
          </DialogDescription>
        </DialogHeader>
        <Separator className="mx-auto bg-primary my-4" />
        <div className="flex flex-col gap-2">
          <div>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-6 w-6" />
                <span className="text-lg">Base Filters</span>
              </div>
            </DialogTitle>
            <Separator className="mx-auto my-4 w-[80%]" />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  {`Radius: ${radius} mi.`}
                </Label>
                <div className="col-span-3 px-4">
                  <Slider
                    value={[radius]}
                    name="radius"
                    defaultValue={[10]}
                    onValueChange={handleRadiusChange}
                    min={1}
                    max={25}
                    step={1}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  {`Number of Resources: ${numResources}`}
                </Label>
                <div className="col-span-3 px-4">
                  <Slider
                    defaultValue={[5]}
                    min={1}
                    onValueChange={handleNumResourcesChange}
                    value={[numResources]}
                    max={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mx-auto bg-primary my-4" />
        <div className="flex flex-col gap-2">
          <div>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-6 w-6" />
                <span className="text-lg">Resource Filters</span>
              </div>
            </DialogTitle>
            <Separator className="mx-auto my-4 w-[80%]" />
            <FilterAccordion isMapSidebar={false} />
          </div>
        </div>
        <Separator className="mx-auto bg-primary my-4" />
        <div className="flex flex-col gap-2">
          <div>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                <span className="text-lg">Resources</span>
              </div>
            </DialogTitle>
            <Separator className="mx-auto my-4 w-[80%]" />
            <p>No Resources Selected</p>
          </div>
        </div>
        <Separator className="mx-auto bg-primary my-4" />
        <div className="flex flex-col gap-2">
          <div>
            <SendMessageButton />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
