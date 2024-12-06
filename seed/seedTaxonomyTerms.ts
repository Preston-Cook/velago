import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { TaxonomyTerm } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-taxonomy-terms.csv');

export async function seedTaxonomyTerms() {
  const taxonomyTerm = await readCsv<TaxonomyTerm>(filePath);

  return await writePrisma.taxonomyTerm.createMany({
    data: taxonomyTerm,
  });
}
