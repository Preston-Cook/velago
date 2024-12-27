import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { ServiceArea } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-service-areas.csv');

export async function seedServiceAreas() {
  const serviceAreaData = await readCsv<ServiceArea>(filePath);

  return await prisma.serviceArea.createMany({
    data: serviceAreaData,
  });
}
