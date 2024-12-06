import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { ServiceCapacity } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-service-capacities.csv');

export async function seedServiceCapacities() {
  const serviceCapacityData = await readCsv<ServiceCapacity>(filePath);

  return await writePrisma.serviceCapacity.createMany({
    data: serviceCapacityData,
  });
}
