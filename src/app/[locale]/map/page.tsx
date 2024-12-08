import { MapHeader } from '@/components/MapHeader';

export default function Map() {
  return (
    <div className="-m-4 flex flex-col">
      <MapHeader />
      <div className="-m-4 flex h-[80vh]">{/* <MapDashboard /> */}</div>
    </div>
  );
}
