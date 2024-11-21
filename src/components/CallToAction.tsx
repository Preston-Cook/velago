import { HomeSearchBar } from './HomeSearchBar';

export function CallToAction() {
  return (
    <div className=" flex flex-col gap-8 items-center justify-center">
      <h1 className="text-primary text-4xl md:text-5xl text-center w-full">
        Find Resources Near You
      </h1>
      <h3 className="text-center text-lg">
        Use Velago to search for healthcare providers and charitable
        organizations near you
      </h3>
      <div className="w-full">
        <HomeSearchBar />
      </div>
    </div>
  );
}
