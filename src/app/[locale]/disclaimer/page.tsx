import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Disclaimer');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function DisclaimerPage() {
  return <div></div>;
}
