import PhoneLoginForm from '@/components/PhoneLoginForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { Globe } from '@/components/Globe';
import { LocaleLink } from '@/components/LocaleLink';

interface UserSignInProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: UserSignInProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);
  const { title, description, noAccount } = dic.pages.userSignIn;

  return (
    <div className="min-h-[90.5vh] w-full lg:grid lg:grid-cols-2">
      <div className="mt-[20%] flex items-center justify-center py-12 md:mt-[10%] lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          <PhoneLoginForm
            dic={dic.pages.userSignIn}
            validation={dic.validation.userSignInFormSchema}
          />
          <div className="mt-4 text-center text-sm">
            {noAccount.text}{' '}
            <LocaleLink href="/user/signup" className="underline">
              {noAccount.link}
            </LocaleLink>
          </div>
        </div>
      </div>
      <div className="hidden border border-l-primary lg:block">
        <div className="flex items-center justify-center">
          <div className="mt-[18vh]">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}
