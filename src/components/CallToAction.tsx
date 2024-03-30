import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/Button';

const searchPlaceholders = [
  'providers or charities near me',
  'healthcare or charities near me',
  'my location for services',
  'local providers or charities near me',
  'nearby healthcare options',
  'Medicare providers near me',
  'nearby charities',
  'healthcare services nearby',
];

export default function CallToAction() {
  const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);

  return (
    <section>
      <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-6xl text-primary">
          Find Resources Near You
        </h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 ">
          Use Velago to search for healthcare providers and charitable
          organizations near you
        </p>
        <div className="flex max-w-md items-center space-x-2 mx-auto mt-10">
          <Input
            className="w-[1000px]"
            type="text"
            placeholder={`${searchPlaceholders[randomIndex]}...`}
          />
          <Button type="submit">
            <Search />
          </Button>
        </div>
      </div>
    </section>
  );
}
