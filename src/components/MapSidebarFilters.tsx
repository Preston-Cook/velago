import { BaseFilters } from './BaseFilters';
import { ResourceFilters } from './ResourceFilters';
import { SelectedResources } from './SelectedResources';
import { Separator } from './ui/Separator';

export function MapSidebarFitlers() {
  return (
    <div>
      <BaseFilters />
      <Separator className="bg-primary" />
      <ResourceFilters />
      <Separator className="bg-primary" />
      <SelectedResources />
    </div>
  );
}
