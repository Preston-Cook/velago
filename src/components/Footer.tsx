import { footerLinks } from '@/config/links';
import { Link } from '@/i18n/routing';
import type { DelocalizedPathname } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Button } from './ui/Button';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="flex flex-col items-center gap-4 border-t border-primary bg-secondary p-4 text-center">
      <Link href={'/'} className="flex items-center justify-center gap-x-2">
        <Image
          loading="eager"
          className="dark:hidden"
          src="/images/logo-black.png"
          height={30}
          width={30}
          alt="Velago logo"
        />
        <Image
          loading="eager"
          className="hidden dark:block"
          src="/images/logo-white.png"
          height={30}
          width={30}
          alt="Velago logo"
        />
        <h3 className="w-fit text-2xl text-primary">Velago</h3>
      </Link>
      <div className="md:max-w-[60%] lg:max-w-[40%]">{t('description')}</div>
      <div className="flex w-full flex-wrap items-center justify-center gap-x-5">
        {footerLinks.map(({ name, href }) => (
          <Link key={uuid()} href={href as DelocalizedPathname}>
            <Button className="p-0 font-semibold" variant={'link'}>
              {t(`links.${name}.text`)}
            </Button>
          </Link>
        ))}
      </div>
      <div>{`© ${new Date().getFullYear()} Velago™ ${t('legal')}`}</div>
    </footer>
  );
}
