'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { IconLink } from './IconLink';

interface PartnerCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  name: string;
}

export function PartnerCard({
  title,
  description,
  icon,
  name,
}: PartnerCardProps) {
  return (
    <Card className="flex flex-col bg-secondary">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-center text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">{description}</CardContent>
      <CardFooter className="w-full">
        <IconLink
          className="w-full"
          variant={'default'}
          i18nRootKey={`Home.partner.${name}`}
          name={name}
          icon={icon}
          href={'/signup/organization'}
        />
      </CardFooter>
    </Card>
  );
}
