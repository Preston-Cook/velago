'use client';

import Link from 'next/link';
import {
  Filter,
  Home,
  LineChart,
  Package,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from './Spinner';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocationApproximation } from '@/context/LocationProvider';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { useQueryParams } from '@/hooks/useQueryParams';
import { LocationSearch } from './LocationSearch';

export function MapDashboard() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    [],
  );

  // const { setQueryParam } = useQueryParams();
  // const searchParams = useSearchParams();
  // const loc = useLocation();

  // const q = searchParams.get('q');
  // const radius = searchParams.get('radius');
  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');

  // // set url params if user directly navigates to /map without search
  // useEffect(
  //   function () {
  //     if (!radius) {
  //       setQueryParam('radius', '10');
  //     }

  //     if (loc !== null) {
  //       const {
  //         city,
  //         region,
  //         countryCode,
  //         lat: defaultLat,
  //         lng: defaultLng,
  //       } = loc;

  //       if (!lat) {
  //         setQueryParam('lat', `${defaultLat}`);
  //       }

  //       if (!lng) {
  //         setQueryParam('lng', `${defaultLng}`);
  //       }

  //       if (!q) {
  //         setQueryParam('q', `${city}, ${region}, ${countryCode}`);
  //       }
  //     }
  //   },
  //   [loc],
  // );

  // function handleRadiusChange(e: number[]) {
  //   setQueryParam('radius', `${e[0]}`);
  // }

  return (
    <div className="grid min-h-[90.5vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-primary bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-primary px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold ml-2">
              <Filter className="h-6 w-6" />
              <span className="text-xl">Filters</span>
            </div>
          </div>

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div className="my-2">
                <Label>Radius: 10 mi.</Label>
                <Slider
                  // value={[Number(radius)]}
                  name="radius"
                  defaultValue={[10]}
                  // onValueChange={handleRadiusChange}
                  min={1}
                  max={25}
                  step={5}
                  className="mt-4"
                />
              </div>
              <div className="mt-4">
                <Label>Number of Resources: 4</Label>
                <Slider className="mt-4" />
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-primary bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Filter className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Filter className="h-6 w-6" />
                  <span className="sr-only">Acme Incasdf</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </DialogContent>
          </Dialog>
          <div className="w-full flex-1">
            <div className="relative">
              {/* <LocationSearch 
                  
                /> */}
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm overflow-hidden"
            x-chunk="dashboard-02-chunk-1"
          >
            <Map />
          </div>
        </main>
      </div>
    </div>
  );
}
