import { MapPin } from 'lucide-react';

export function SelectedResources() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="flex items-center gap-x-4 text-lg">
        <MapPin />
        Selected Resources
      </h3>
    </div>
  );
}
