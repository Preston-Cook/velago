import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <Card className="md:w-[35%] self-stretch flex flex-col justify-around bg-secondary">
      <CardHeader>
        <CardTitle className="text-center mb-2 text-primary">{title}</CardTitle>
        <CardDescription className="text-center text-base dark:text-white text-black">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-[80%] mx-auto">{action}</Button>
      </CardFooter>
    </Card>
  );
}
