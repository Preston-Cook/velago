import { Globe } from '@/components/Globe';
import { getTranslations } from 'next-intl/server';

export default async function SignInOrganization() {
  const t = await getTranslations('SignInOrganization');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="my-auto flex justify-between">
        <div className="flex-1 border-b-transparent border-l-transparent border-r-primary border-t-transparent lg:border">
          <div className="mx-auto flex flex-col gap-4 sm:max-w-[90%] md:max-w-[80%]">
            <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
              {t('heading')}
            </h1>
            <h3 className="text-center">{t('subheading')}</h3>
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <Globe />
        </div>
      </div>
    </div>
  );
}
