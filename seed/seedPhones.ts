import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Phone } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-phones.csv');

export async function seedPhones() {
  let phoneData = await readCsv<Phone>(filePath);

  phoneData = phoneData.map((row) => {
    row['extension'] = row['extension'] ? Number(row['extension']) : null;
    row['locationId'] = row['locationId'] ? row['locationId'] : null;
    row['contactId'] = row['contactId'] ? row['contactId'] : null;
    row['serviceId'] = row['serviceId'] ? row['serviceId'] : null;
    row['organizationId'] = row['organizationId']
      ? row['organizationId']
      : null;

    row['serviceAtLocationId'] = row['serviceAtLocationId']
      ? row['serviceAtLocationId']
      : null;
    return row;
  });

  return await prisma.phone.createMany({
    data: phoneData,
  });
}
