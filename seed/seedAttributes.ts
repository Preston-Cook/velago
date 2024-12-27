import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Attribute } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-attributes.csv');

export async function seedAttributes() {
  const attributeData = await readCsv<Attribute>(filePath);

  return await prisma.attribute.createMany({
    data: attributeData,
  });
}
