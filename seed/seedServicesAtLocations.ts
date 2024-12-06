import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { ServiceAtLocation } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(
  __dirname,
  '../data/demo-services-at-locations.csv',
);

export async function seedServicesAtLocations() {
  const servicesAtLocationsData = await readCsv<ServiceAtLocation>(filePath);

  return await writePrisma.serviceAtLocation.createMany({
    data: servicesAtLocationsData,
  });
}
