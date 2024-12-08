import { Globe, Goal, UserRoundPlus } from 'lucide-react';

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
];
