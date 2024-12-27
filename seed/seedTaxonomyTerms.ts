import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { TaxonomyTerm } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-taxonomy-terms.csv');

export async function seedTaxonomyTerms() {
  const taxonomyTerm = await readCsv<TaxonomyTerm>(filePath);

  return await prisma.taxonomyTerm.createMany({
    data: taxonomyTerm,
  });
}
