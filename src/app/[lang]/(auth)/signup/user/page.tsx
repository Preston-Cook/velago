import { Globe } from '@/components/Globe';
import { LocaleLink } from '@/components/LocaleLink';
import { PhoneSignUpForm } from '@/components/PhoneSignUpForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface UserSignUpProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: UserSignUpProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);
  const { title, description, accountExists, orgAccount } =
    dic.pages.userSignUp;

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex h-[90.75vh] items-center justify-center py-12 lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          <PhoneSignUpForm dic={dic.pages.userSignUp} />
          <div className="text-center text-sm">
            {accountExists.text}{' '}
            <LocaleLink href="/signin/user" className="underline">
              {accountExists.link}
            </LocaleLink>
          </div>
          <div className="text-center text-sm">
            {orgAccount.text}{' '}
            <LocaleLink href="/signup/organization" className="underline">
              {orgAccount.link}
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
