import { FilterMenu } from './FilterMenu';

export function MapHeader() {
  return (
    <div className="border border-b-primary p-4">
      <div className="flex items-center">
        <FilterMenu />
      </div>
    </div>
  );
}
