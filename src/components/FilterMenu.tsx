import { Filter, MapIcon, SlidersHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SendMessageButton } from './SendMessageButton';
import { Separator } from './ui/separator';

export function FilterMenu() {
  const { getQueryParam, setQueryParam } = useQueryParams();

  const radius = Number(getQueryParam('radius'));
  const numResources = Number(getQueryParam('num_resources'));

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
      <DialogContent className="flex flex-col">
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
        <Separator className="mx-auto bg-primary" />
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
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        <DialogFooter>
          <SendMessageButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
