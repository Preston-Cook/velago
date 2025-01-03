import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Privacy');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function Privacy() {
  return <div></div>;
}
