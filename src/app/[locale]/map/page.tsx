import { MapDashboard } from '@/components/MapDashboard';
import { MapHeader } from '@/components/MapHeader';
import { MapSidebar } from '@/components/MapSidebar';

export default function Map() {
  return (
    <div className="-m-4 flex h-[80vh] bg-secondary">
      <MapSidebar />
      <div className="flex flex-1 flex-col">
        <MapHeader />
        <MapDashboard />
      </div>
    </div>
  );
}
