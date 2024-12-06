import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Taxonomy } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-taxonomies.csv');

export async function seedTaxonomies() {
  const taxonomyData = await readCsv<Taxonomy>(filePath);

  return await writePrisma.taxonomy.createMany({
    data: taxonomyData,
  });
}
