import { footerLinks } from '@/config/footerLinks';
import { Link } from '@/i18n/routing';
import type { PathnameConfig } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Button } from './ui/Button';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="bg-secondary border-t border-primary p-4 items-center flex flex-col gap-4 text-center">
      <div className="flex justify-center gap-x-2 items-center">
        <Image
          className="dark:hidden"
          src="/images/logo-black.png"
          height={30}
          width={30}
          alt="Velago logo"
        />
        <Image
          className="hidden dark:block"
          src="/images/logo-white.png"
          height={30}
          width={30}
          alt="Velago logo"
        />
        <h3 className="text-primary text-2xl w-fit">Velago</h3>
      </div>
      <div className="md:max-w-[60%]">{t('description')}</div>
      <div className="w-full flex gap-x-5 items-center justify-center">
        {footerLinks.map(({ name, href }) => (
          <Link key={uuid()} href={href as keyof PathnameConfig}>
            <Button className="font-semibold p-0" variant={'link'}>
              {t(`links.${name}.text`)}
            </Button>
          </Link>
        ))}
      </div>
      <div>{`© ${new Date().getFullYear()} Velago™ ${t('legal')}`}</div>
    </footer>
  );
}
