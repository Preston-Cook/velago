import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n.config';
import { LocaleLink } from '@/components/LocaleLink';
import { UserRound } from 'lucide-react';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}
export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="justify-left flex items-center text-3xl font-semibold">
          <UserRound className="mr-2" />
          Profile
        </h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <LocaleLink href="/profile" className="font-semibold text-primary">
            Profile
          </LocaleLink>

          <LocaleLink href="/settings">Settings</LocaleLink>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}
