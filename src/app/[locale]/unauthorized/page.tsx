import { UnauthorizedPage } from '@/components/UnauthorizedPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Unauthorized');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function Unauthorized() {
  return <UnauthorizedPage />;
}
