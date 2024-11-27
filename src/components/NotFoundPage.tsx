import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Globe } from './Globe';
import { Button } from './ui/Button';

export async function NotFoundPage() {
  const t = await getTranslations('Contact');

  return (
    <div className="flex flex-1 flex-col items-center gap-12 py-12">
      <div className="my-auto flex justify-between">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded border-b-transparent border-l-transparent border-r-primary border-t-transparent bg-secondary p-4 px-12 lg:rounded-br-none lg:rounded-tr-none lg:border">
          <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
            Oops Page Not Found!
          </h1>
          <h3 className="text-center">
            We couldn't find the page you're looking for.
          </h3>
          <div className="flex w-[70%] flex-col gap-4 md:w-[60%] lg:w-[50%]">
            <div className="flex flex-col gap-4">
              <p className="text-center">
                It looks like the page you're trying to access doesn't exist or
                has been moved.
              </p>
              <p className="text-center">
                If you need help or found a bug, feel free to contact us{' '}
                <span>
                  <Link
                    className="text-primary hover:underline"
                    href={'/contact'}
                  >
                    here
                  </Link>
                </span>
                .
              </p>
            </div>
            <Link className="w-full" href={'/'}>
              <Button className="w-full">
                <ArrowLeft />
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden flex-1 px-12 lg:block">
          <Globe />
        </div>
      </div>
      {/* <div className="my-auto flex justify-between">
        <div className="flex flex-1 flex-col items-center justify-center border-b-transparent border-l-transparent border-r-primary border-t-transparent lg:border">
          <div className="mx-auto flex flex-col gap-4">
            <h1 className="w-full text-center text-4xl text-primary md:text-5xl">
              Oops Page Not Found!
            </h1>
            <h3 className="text-center">
              We couldn't find the page you're looking for.
            </h3>
            <div>
              <div className="flex flex-col items-center justify-center text-center">
                It looks like the page you're trying to access doesn't exist or
                has been moved. Please check the URL for any errors, or use the
                navigation to find what you're looking for. If you need help,
                feel free to contact us.
              </div>
              <Button className="mx-auto">
                <ArrowLeft />
                Go Back to Home page
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <Globe />
        </div>
      </div> */}
    </div>
  );
}
