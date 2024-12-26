import { MapSidebarFilters } from '@/components/MapSidebarFilters';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Filter, FilterIcon } from 'lucide-react';

interface FilterMenuProps {
  className?: string;
}

export function FilterMenu({ className }: FilterMenuProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          <Filter />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={
          'max-h-[80vh] overflow-y-scroll border border-primary bg-secondary sm:max-w-[425px]'
        }
      >
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="flex items-center justify-center gap-2">
            <FilterIcon /> Filters
          </DialogTitle>
        </DialogHeader>
        <section className="border border-primary border-l-transparent border-r-transparent">
          <MapSidebarFilters />
        </section>

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
      </DialogContent>
    </Dialog>
  );
}
