import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Location, LocationType } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-locations.csv');

const enumMapping = {
  locationType: {
    PHYSICAL: LocationType.PHYSICAL,
    POSTAL: LocationType.POSTAL,
    VIRTUAL: LocationType.VIRTUAL,
  },
};

export async function seedLocations() {
  let locationData = await readCsv<Location, LocationType>(
    filePath,
    [],
    enumMapping,
  );

  locationData = locationData.map((row) => {
    row['latitude'] = Number(row['latitude']);
    row['longitude'] = Number(row['longitude']);
    return row;
  });

  await writePrisma.location.createMany({
    data: locationData,
  });
}
