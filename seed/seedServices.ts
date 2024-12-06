import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Service } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-services.csv');

export async function seedServices() {
  let serviceData = await readCsv<Service>(filePath);

  serviceData = serviceData.map((row) => {
    row['minimumAge'] = row['minimumAge'] ? row['minimumAge'] : null;
    row['maximumAge'] = row['maximumAge'] ? row['maximumAge'] : null;
    row['lastModified'] = new Date();
    return row;
  });

  await writePrisma.service.createMany({
    data: serviceData,
  });
}
