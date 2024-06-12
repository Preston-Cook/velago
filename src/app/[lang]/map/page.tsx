import { MapDashboard } from '@/components/MapDashboard';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface MapProps {
  params: { lang: Locale };
}

export default async function Page({ params }: MapProps) {
  const { lang } = params;
  const dic = (await getDictionary(lang)).pages.home.callToAction;
  const searchPlaceholders = dic.placeholders;
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
  const placeholder = searchPlaceholders[randomIndex];

  return <MapDashboard placeholder={placeholder} />;
}
