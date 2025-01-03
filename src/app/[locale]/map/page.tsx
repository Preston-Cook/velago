import { MapDashboard } from '@/components/MapDashboard';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Map');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default function Map() {
  return <MapDashboard />;
}
