import { NotFoundPage } from '@/components/NotFoundPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default function NotFound() {
  return <NotFoundPage />;
}
