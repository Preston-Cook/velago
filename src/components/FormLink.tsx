import { Link } from '@/i18n/routing';
import { PathnameConfig } from '@/types';
import { Button } from './ui/Button';

interface FormLinkProps {
  text: string;
  linkText: string;
  href: keyof PathnameConfig;
}

export function FormLink({ text, linkText, href }: FormLinkProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div>{text}</div>
      <Link className="inline" href={href}>
        <Button className="p-0" variant="link">
          {linkText}
        </Button>
      </Link>
    </div>
  );
}
