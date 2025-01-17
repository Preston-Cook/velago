import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { MetaTableDescription } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(
  __dirname,
  '../data/demo-meta-table-descriptions.csv',
);

export async function seedMetaTableDescriptions() {
  const metaTableDescription = await readCsv<MetaTableDescription>(filePath);

  return await prisma.metaTableDescription.createMany({
    data: metaTableDescription,
  });
}
