import Link from 'next/link';
import PartnerCard from './PartnerCard';
import { Button } from './ui/button';

const description1 =
  'Partner with us to reach more patients in need. Showcase your services and contribute to improving healthcare accessibility. Explore partnership opportunities today!';
const description2 =
  'Join us in making a difference. List your services, share impact stories, and engage with a caring community. Start your partnership journey today!';

export default function Content() {
  return (
    <>
      <section className="mx-auto w-full py-6">
        <h2 className="mb-2 lg:mb-8 text-3xl lg:text-4xl font-bold text-center text-primary">
          Partner with Us
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-10 md:gap-24 px-4">
          <PartnerCard
            title="Healthcare Providers"
            description={description1}
            action="List Your Provider"
          />
          <PartnerCard
            title="Organizations"
            description={description2}
            action="List Your Organization"
          />
        </div>
      </section>
      <section>
        <div className="px-4 mx-auto max-w-screen-xl lg:py-6 lg:px-6">
          <div className="sm:text-lg">
            <h2 className="mb-4 text-4xl text-center text-primary tracking-tight font-bold ">
              Revolutionizing Access for All
            </h2>
            <p className="my-8">
              Welcome to Velago, where we are revolutionizing access to
              healthcare and charitable services. Our platform connects
              underprivileged individuals with Medicare-accepting healthcare
              providers and compassionate charitable organizations. Through easy
              search tools and comprehensive listings, users can find the
              support they need, while providers and organizations can reach a
              wider audience and make a lasting impact.
            </p>
            <p className="mb-4 font-semibold">
              Join us in creating a world where everyone has access to essential
              healthcare and support services. Explore, connect, and make a
              difference with Velago today.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center font-medium mt-4"
            >
              <Button className="pl-0" variant="link">
                Learn more
                <svg
                  className="ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
