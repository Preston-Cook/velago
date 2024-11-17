import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="bg-background border-t border-primary">
      <div>
        <h3 className={''}>Velago</h3>
      </div>
      <div>{t('description')}</div>
      <div></div>
      <div>{t('legal')}</div>
    </footer>
  );
}
