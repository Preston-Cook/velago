import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Globe } from './Globe';
import { Button } from './ui/Button';

export async function UnauthorizedPage() {
  const t = await getTranslations('Unauthorized');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="my-auto flex justify-between">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded border-b-transparent border-l-transparent border-r-primary border-t-transparent bg-secondary p-4 px-12 lg:rounded-br-none lg:rounded-tr-none lg:border">
          <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
            {t('heading')}
          </h1>
          <h3 className="text-center">{t('subheading')}</h3>
          <div className="flex w-[70%] flex-col gap-4 md:w-[60%] lg:w-[50%]">
            <div className="flex flex-col gap-4">
              <p className="text-center">{t('section1.text')}</p>
              <p className="text-center">
                {t('section2.text')}{' '}
                <span>
                  <Link
                    className="text-primary hover:underline"
                    href={'/contact'}
                  >
                    {t('section2.breakText')}
                  </Link>
                </span>
                .
              </p>
            </div>
            <Link className="w-full" href={'/'}>
              <Button className="w-full">
                <ArrowLeft />
                {t('button.text')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden flex-1 px-12 lg:block">
          <Globe />
        </div>
      </div>
    </div>
  );
}
