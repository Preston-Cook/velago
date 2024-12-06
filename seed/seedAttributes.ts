import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Attribute } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-attributes.csv');

export async function seedAttributes() {
  const attributeData = await readCsv<Attribute>(filePath);

  return await writePrisma.attribute.createMany({
    data: attributeData,
  });
}
