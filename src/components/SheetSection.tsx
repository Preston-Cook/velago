import { sheetLinks } from '@/config/links';
import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';
import { IconLink } from './IconLink';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';
import { SheetDescription } from './ui/sheet';

interface SheetLinkProps {
  name: string;
  links: string[];
}

export function SheetSection({ name: sectionName, links }: SheetLinkProps) {
  const t = useTranslations('Sheet.sections');
  const sectionLinks = sheetLinks.filter(({ name }) => links.includes(name));

  return (
    <div className="flex flex-col gap-4">
      <SheetDescription className="text-lg">
        {t(`${sectionName}.title`)}
      </SheetDescription>
      {sectionName !== 'account' ? (
        <div className="flex flex-col gap-4">
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
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <SignInButton className="flex-1" />
          <SignUpButton className="flex-1" />
        </div>
      )}
    </div>
  );
}

{
  /* <div className={`flex flex-col gap-4`}>
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
      </div> */
}
