'use client';

import { headerLinks } from '@/config/links';
import { v4 as uuid } from 'uuid';
import { IconLink } from './IconLink';

export function HeaderLinks() {
  return (
    <>
      {headerLinks.map(({ href, name, icon }) => (
        <IconLink
          key={uuid()}
          href={href}
          name={name}
          icon={icon}
          i18nRootKey="Components.Header"
        />
      ))}
    </>
  );
}
