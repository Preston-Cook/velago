import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Funding } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-funding.csv');

export async function seedFunding() {
  const fundingData = await readCsv<Funding>(filePath);

  return await writePrisma.funding.createMany({
    data: fundingData,
  });
}
