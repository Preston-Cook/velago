import { Globe } from '@/components/Globe';
import { LocaleLink } from '@/components/LocaleLink';
import { OrganizationSignUpForm } from '@/components/OrganizationSignUpForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface OrganizationSignUpProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: OrganizationSignUpProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);
  const { title, description, signIn, userAccount } = dic.pages.orgSignUp;

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex min-h-[90.75vh] items-center justify-center py-12 lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>

          <OrganizationSignUpForm
            dic={dic.pages.orgSignUp}
            validation={dic.pages.orgSignUp.validation}
          />

          <div className="mt-4 text-center text-sm">
            {signIn.text}{' '}
            <LocaleLink href="/signin/organization" className="underline">
              {signIn.link}
            </LocaleLink>
          </div>
          <div className="text-center text-sm">
            {userAccount.text}{' '}
            <LocaleLink href="/signup/user" className="underline">
              {userAccount.link}
            </LocaleLink>
          </div>
        </div>
      </div>
      <div className="hidden min-h-[90.75vh] border-l border-l-primary bg-background lg:block">
        <div className="flex items-center justify-center">
          <div className="mt-[18vh]">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}
