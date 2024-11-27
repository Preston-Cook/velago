import Globe from '@/components/Globe';
import { getTranslations } from 'next-intl/server';

export default async function SignUpUser() {
  const t = await getTranslations('Contact');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="gap- flex flex-col gap-4 sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%]">
        <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
          {t('heading')}
        </h1>
        <p className="text-center">{t('subheading')}</p>
        {/* <ContactForm /> */}
        <Globe />
      </div>
    </div>
  );
}
