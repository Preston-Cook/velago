import { Locale } from '@/i18n.config';

interface DashboardPageProps {
  params: {
    lang: Locale;
  };
}

export default function Dashboard({ params }: DashboardPageProps) {
  const { lang } = params;
  return <div></div>;
}
