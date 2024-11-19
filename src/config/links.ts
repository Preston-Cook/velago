import { IconLink } from '@/types';
import {
  BriefcaseBusiness,
  Cookie,
  Map,
  Phone,
  ShieldAlert,
} from 'lucide-react';

export const headerLinks: IconLink[] = [
  {
    name: 'map',
    href: '/map',
    icon: Map,
  },
  {
    name: 'about',
    href: '/about',
    icon: BriefcaseBusiness,
  },
  {
    name: 'contact',
    href: '/contact',
    icon: Phone,
  },
];

export const sheetLinks: IconLink[] = [
  {
    name: 'map',
    href: '/map',
    icon: Map,
  },
  {
    name: 'about',
    href: '/about',
    icon: BriefcaseBusiness,
  },
  {
    name: 'contact',
    href: '/contact',
    icon: Phone,
  },
  {
    name: 'privacy',
    href: '/privacy',
    icon: Cookie,
  },
  {
    name: 'disclaimer',
    href: '/disclaimer',
    icon: ShieldAlert,
  },
];

export const footerLinks = [
  {
    name: 'map',
    href: '/map',
  },
  {
    name: 'contact',
    href: '/contact',
  },
  {
    name: 'about',
    href: '/about',
  },
  {
    name: 'privacy',
    href: '/privacy',
  },
  {
    name: 'disclaimer',
    href: '/disclaimer',
  },
];
