import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { FieldEnumMapping } from '@/types';
import { Address, LocationType } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-addresses.csv');

const addressEnumMappings: FieldEnumMapping<Address, LocationType> = {
  addressType: {
    PHYSICAL: LocationType.PHYSICAL,
    POSTAL: LocationType.POSTAL,
    VIRTUAL: LocationType.VIRTUAL,
  },
};

export async function seedAddresses() {
  // seed organization addresses
  const addressData = await readCsv<Address, LocationType>(
    filePath,
    [],
    addressEnumMappings,
  );

  await prisma.address.createMany({
    data: addressData,
  });
}
