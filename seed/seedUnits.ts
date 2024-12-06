import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Unit } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-units.csv');

export async function seedUnits() {
  const unitData = await readCsv<Unit>(filePath);

  return await writePrisma.unit.createMany({
    data: unitData,
  });
}
