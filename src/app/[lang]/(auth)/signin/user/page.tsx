import Image from 'next/image';
import PhoneLoginForm from '@/components/PhoneLoginForm';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Globe } from '@/components/Globe';

interface SignInUserProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: SignInUserProps) {
  const { lang } = params;
  const dic = await getDictionary(lang);
  const { title, description } = dic.pages.contact;
  const {
    validation: { contactSchema },
  } = dic;

  return (
    <div className="w-full lg:grid min-h-[90.5vh] lg:grid-cols-2 ">
      <div className="flex items-center  justify-center py-12 mt-[20%] md:mt-[10%] lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your phone number below to login to your account
            </p>
          </div>
          <PhoneLoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border border-l-primary">
        <div className="flex items-center justify-center">
          <div className="mt-[18vh]">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}
