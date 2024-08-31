import { LocaleLink } from '@/components/LocaleLink';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';

export default async function Profile() {
  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>
            <div className="flex">
              Update Phone
              <Phone />
            </div>
          </CardTitle>
          <CardDescription>Phone Number</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="(123)-456-7890" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="text-white">Verify Phone</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>
            <div className="flex">Your Saved Resources</div>
          </CardTitle>
          <CardDescription>Phone Number</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You have no saved resources</p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <LocaleLink href="/map">
            <Button className="text-white">Browse Map</Button>
          </LocaleLink>
        </CardFooter>
      </Card>
    </>
  );
}
