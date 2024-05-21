import { Locale } from '@/i18n.config';
import { useTheme } from 'next-themes';
import MapContainer from '@/components/MapContainer';

interface MapProps {
  params: { lang: Locale };
}

export default async function Map({ params }: MapProps) {
  return <MapContainer />;
}
