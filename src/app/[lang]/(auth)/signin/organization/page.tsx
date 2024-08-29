import { Globe } from '@/components/Globe';
import { LocaleLink } from '@/components/LocaleLink';
import { OrganizationSignInForm } from '@/components/OrganizationSignInForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface UserSignInProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: UserSignInProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);

  const { title, description, noAccount, userAccount } = dic.pages.orgSignIn;

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex h-[90.75vh] items-center justify-center py-12 lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          <OrganizationSignInForm
            dic={dic.pages.orgSignIn}
            validation={dic.pages.orgSignIn.validation}
          />
          <div className="mt-4 text-center text-sm">
            {noAccount.text}{' '}
            <LocaleLink href="/signup/organization" className="underline">
              {noAccount.link}
            </LocaleLink>
          </div>
          <div className="text-center text-sm">
            {userAccount.text}{' '}
            <LocaleLink href="/signup/organization" className="underline">
              {userAccount.link}
            </LocaleLink>
          </div>
        </div>
      </div>
      <div className="hidden border border-b-background border-l-primary bg-background lg:block">
        <div className="flex items-center justify-center">
          <div className="mt-[18vh]">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}
