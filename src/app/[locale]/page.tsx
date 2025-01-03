import { CallToAction } from '@/components/CallToAction';
import { FrequentlyAskedQuestions } from '@/components/FrequentlyAskedQuestions';
import { Info } from '@/components/Info';
import { Partner } from '@/components/Partner';
import { Separator } from '@/components/ui/Separator';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Home');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <CallToAction />
      <Separator className="mx-auto bg-primary sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]" />
      <Partner />
      <Info />
      <FrequentlyAskedQuestions />
    </div>
  );
}
