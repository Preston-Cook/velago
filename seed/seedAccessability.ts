import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Accessability } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-accessability.csv');

export async function seedAccessability() {
  const accessabilityData = await readCsv<Accessability>(filePath);

  return await prisma.accessability.createMany({
    data: accessabilityData,
  });
}
