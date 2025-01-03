import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Dashboard');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function Dashboard() {
  return <div>adsf</div>;
}
