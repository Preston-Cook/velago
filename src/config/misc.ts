import { DelocalizedPathname } from '@/types';
import { Role } from '@prisma/client';
import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Car,
  Gavel,
  Globe,
  Goal,
  Handshake,
  HeartPulse,
  Home,
  Package,
  Plug,
  ShieldCheck,
  ShoppingBag,
  Target,
  UserRoundPlus,
  Users,
  UtensilsCrossed,
} from 'lucide-react';

export const sheetSectionNames = [
  { name: 'menu', links: ['map', 'about', 'contact'] },
  { name: 'legal', links: ['privacy', 'disclaimer'] },
];

export const searchPlaceholders = [
  'Westminster, London SW1A 1AA, United Kingdom',
  '1600 Pennsylvania Avenue NW, Washington, D.C., USA',
  'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
  'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
  'Bennelong Point, Sydney NSW 2000, Australia',
  '221B Baker Street London NW1 6XE, United Kingdom',
  '12 Grimmauld Place London, United Kingdom',
  '742 Evergreen Terrace Springfield, USA',
  '4 Privet Drive Little Whinging, Surrey, England',
];

export const aboutSectionIcons = [
  {
    section: 1,
    icon: Goal,
  },
  {
    section: 2,
    icon: UserRoundPlus,
  },
  {
    section: 3,
    icon: Globe,
  },
];

export const serviceCategories = [
  'Consumer Services',
  'Criminal Jusitice and Legal Services',
  'Education',
  'Environment and Public Health/Safety',
  'Food',
  'Healthcare',
  'Housing/Shelter',
  'Income Support and Employment',
  'Individual and Family Life',
  'Material Goods',
  'Mental Health and Substance Use',
  'Organizational/Community Services',
  'Target Populations',
  'Transportation',
  'Utilities',
] as const;

export const authPages = [
  '/en/signup/user',
  '/en/signin/user',
  '/en/signup/organization',
  '/en/signin/organization',
  '/es/registrarse/usuario',
  '/es/iniciar-sesion/usuario',
  '/es/registrarse/organizacion',
  '/es/iniciar-sesion/organizacion',
];

export const defaultRedirect: Record<Role, DelocalizedPathname> = {
  USER: '/map',
  ORGANIZATION: '/dashboard',
  ADMIN: '/dashboard',
};

export const serviceCategoryIcons = {
  'Consumer Services': 'shopping-bag', // Represents commerce and consumer-oriented services.
  'Criminal Justice and Legal Services': 'gavel', // Symbolic of justice and legal matters.
  Education: 'book-open', // Represents learning and educational services.
  'Environment and Public Health/Safety': 'shield-check', // Suggests safety and public well-being.
  Food: 'utensils-crossed', // Commonly associated with meals and food services.
  'Health Care': 'heart-pulse', // Universal symbol for medical care.
  'Housing/Shelter': 'home', // Represents shelter and housing.
  'Income Support and Employment': 'briefcase-business', // Relates to jobs and financial support.
  'Individual and Family Life': 'users', // Symbolizes people and family groups.
  'Material Goods': 'package', // Represents tangible goods and resources.
  'Mental Health and Substance Abuse': 'brain', // Relates to mental wellness and substance use.
  'Organizational/Community Services': 'handshake', // Suggests collaboration and service.
  'Target Populations': 'target', // Represents focused groups or demographics.
  Transportation: 'car', // Symbolic of transit and transportation services.
  Utilities: 'plug', // Represents electricity and essential services.
};

export const serviceCategoryIconsLucide = {
  'Consumer Services': ShoppingBag,
  'Criminal Justice and Legal Services': Gavel,
  Education: BookOpen,
  'Environment and Public Health/Safety': ShieldCheck,
  Food: UtensilsCrossed,
  'Health Care': HeartPulse,
  'Housing/Shelter': Home,
  'Income Support and Employment': BriefcaseBusiness,
  'Individual and Family Life': Users,
  'Material Goods': Package,
  'Mental Health and Substance Abuse': Brain,
  'Organizational/Community Services': Handshake,
  'Target Populations': Target,
  Transportation: Car,
  Utilities: Plug,
};

export const defaultCoords = {
  latitude: 30.28565,
  longitude: -97.73921,
} as const;

export const mapIconSize = 35 as const;

export const iconUrls = {
  light: '/images/logo-black.png',
  dark: '/images/logo-white.png',
} as const;
