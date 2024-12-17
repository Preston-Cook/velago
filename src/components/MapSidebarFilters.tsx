import { BaseFilters } from './BaseFilters';
import { MapSidebarSelectedResources } from './MapSidebarSelectedResources';
import { ResourceFilters } from './ResourceFilters';
import { Separator } from './ui/Separator';

export function MapSidebarFilters() {
  return (
    <div>
      <BaseFilters />
      <Separator className="bg-primary" />
      <ResourceFilters />
      <Separator className="bg-primary" />
      <MapSidebarSelectedResources />
    </div>
  );
}
