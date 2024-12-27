import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Unit } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-units.csv');

export async function seedUnits() {
  const unitData = await readCsv<Unit>(filePath);

  return await prisma.unit.createMany({
    data: unitData,
  });
}
