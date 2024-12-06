import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Metadata } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-metadata.csv');

export async function seedMetadata() {
  const metadataData = await readCsv<Metadata>(filePath);

  return await writePrisma.metadata.createMany({
    data: metadataData,
  });
}
