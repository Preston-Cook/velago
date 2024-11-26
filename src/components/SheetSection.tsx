import { sheetLinks } from '@/config/links';
import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';
import { IconLink } from './IconLink';
import { SheetDescription } from './ui/Sheet';

interface SheetLinkProps {
  name: string;
  links: string[];
}

export function SheetSection({ name: sectionName, links }: SheetLinkProps) {
  const t = useTranslations('Sheet.sections');
  const sectionLinks = sheetLinks.filter(({ name }) => links.includes(name));

  return (
    <div
      className={`flex flex-col gap-4 ${sectionName !== 'legal' && 'flex-1'}`}
    >
      <SheetDescription className="text-lg">
        {t(`${sectionName}.title`)}
      </SheetDescription>
      <div
        className={`flex flex-col gap-4 ${sectionName === 'legal' && 'md:flex-row'}`}
      >
        {sectionLinks.map(({ icon, name: linkName, href }) => (
          <IconLink
            className="w-full"
            i18nRootKey={`Sheet.sections.${sectionName}`}
            icon={icon}
            name={linkName}
            href={href}
            key={uuid()}
          />
        ))}
      </div>
    </div>
  );
}
