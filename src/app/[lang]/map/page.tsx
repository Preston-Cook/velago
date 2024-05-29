import { MapDashboard } from '@/components/MapDashboard';
import { Locale } from '@/i18n.config';

interface MapProps {
  params: { lang: Locale };
}

export default async function Page({ params }: MapProps) {
  return (
    <>
      <MapDashboard />
    </>
  );
}
