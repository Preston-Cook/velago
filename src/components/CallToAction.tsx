import { HomeSearchBar } from './HomeSearchBar';

export function CallToAction() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-primary text-5xl text-center">
        Find Resources Near You
      </h1>
      <p className="text-center">
        Use Velago to search for healthcare providers and charitable
        organizations near you
      </p>
      <div className="flex-1 w-full">
        <HomeSearchBar />
      </div>
    </div>
  );
}
