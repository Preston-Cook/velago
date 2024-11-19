import { IconLink } from '@/types';
import {
  BriefcaseBusiness,
  Cookie,
  Key,
  Map,
  Phone,
  ShieldAlert,
  User,
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
  {
    name: 'signIn',
    href: '/signup/user',
    icon: Key,
  },
  {
    name: 'signUp',
    href: '/signup/user',
    icon: User,
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
