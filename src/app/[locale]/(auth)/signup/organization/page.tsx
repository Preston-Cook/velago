import { SignUpOrganizationForm } from '@/components/forms/SignUpOrganizationForm';
import { Globe } from '@/components/Globe';
import { getTranslations } from 'next-intl/server';

export default async function SignUpOrganization() {
  const t = await getTranslations('SignUpOrganization');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="my-auto flex justify-between">
        <div className="flex-1 border-b-transparent border-l-transparent border-r-primary border-t-transparent lg:border">
          <div className="mx-auto flex flex-col gap-4 sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:md:max-w-[60%]">
            <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
              {t('heading')}
            </h1>
            <h3 className="text-center">{t('subheading')}</h3>
            <SignUpOrganizationForm />
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center md:flex lg:block">
          <Globe />
        </div>
      </div>
    </div>
  );
}
