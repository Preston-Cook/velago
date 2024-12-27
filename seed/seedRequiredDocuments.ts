import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { RequiredDocument } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-required-documents.csv');

export async function seedRequiredDocuments() {
  const requiredDocumentData = await readCsv<RequiredDocument>(filePath);

  return await prisma.requiredDocument.createMany({
    data: requiredDocumentData,
  });
}
