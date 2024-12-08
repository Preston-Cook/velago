import { Filter } from 'lucide-react';

export function MapSidebar() {
  return (
    <aside className="hidden w-[200px] border border-r-primary bg-background md:block">
      <div className="flex h-full flex-col">
        <div className="h-[72px] border border-b-primary">
          <div className="mt-5 flex items-center justify-center gap-2">
            <h2 className="text-xl">Filters</h2>
            <Filter />
          </div>
        </div>
        <div className="flex-1 bg-secondary">asdf</div>
      </div>
    </aside>
  );
}
