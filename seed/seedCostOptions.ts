import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { CostOption } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-cost-options.csv');

export async function seedCostOptions() {
  const attributeData = await readCsv<CostOption>(filePath);

  return await prisma.costOption.createMany({
    data: attributeData,
  });
}
