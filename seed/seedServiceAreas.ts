import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { ServiceArea } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-service-areas.csv');

export async function seedServiceAreas() {
  const serviceAreaData = await readCsv<ServiceArea>(filePath);

  return await writePrisma.serviceArea.createMany({
    data: serviceAreaData,
  });
}
