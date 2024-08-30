import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LocaleLink } from './LocaleLink';

interface PartnerCardProps {
  title: string;
  description: string;
  action: string;
}

export default function PartnerCard({
  title,
  description,
  action,
}: PartnerCardProps) {
  return (
    <Card className="flex flex-col justify-between self-stretch bg-secondary md:w-[35%]">
      <CardHeader className="flex flex-1 flex-col">
        <CardTitle className="mb-2 min-h-14 text-center text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-base text-black dark:text-white">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full">
        <LocaleLink href="/signup/organization" className="mx-auto w-[80%] ">
          <Button className="mx-auto text-white w-full">{action}</Button>
        </LocaleLink>
      </CardFooter>
    </Card>
  );
}
