import { Button } from '@/components/ui/button';
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
    <Card className="md:w-[35%] self-stretch flex flex-col justify-between bg-secondary">
      <CardHeader className="flex flex-col  flex-1">
        <CardTitle className="text-center mb-2 text-primary min-h-14">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-base dark:text-white text-black">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-[80%] mx-auto text-white">{action}</Button>
      </CardFooter>
    </Card>
  );
}
