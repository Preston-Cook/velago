import { FormLink } from '@/components/FormLink';
import { SignInUserForm } from '@/components/forms/SignInUserForm';
import { Globe } from '@/components/Globe';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('UserSignIn');

  return {
    title: `Velago | ${t('title')}`,
  };
}

export default async function SignInUser() {
  const t = await getTranslations('UserSignIn');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="my-auto flex justify-between">
        <div className="flex-1 border-b-transparent border-l-transparent border-r-primary border-t-transparent lg:border">
          <div className="mx-auto flex flex-col gap-4 sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:md:max-w-[60%]">
            <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
              {t('heading')}
            </h1>
            <h3 className="text-center">{t('subheading')}</h3>
            <SignInUserForm />
            <div className="flex flex-col text-center">
              <FormLink
                href="/signup/user"
                text={t('authLinks.link1.text')}
                linkText={t('authLinks.link1.link')}
              />
              <FormLink
                href="/signin/organization"
                text={t('authLinks.link2.text')}
                linkText={t('authLinks.link2.link')}
              />
            </div>
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <Globe />
        </div>
      </div>
    </div>
  );
}
