import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { URL } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-urls.csv');

export async function seedUrls() {
  const urlData = await readCsv<URL>(filePath);

  return await writePrisma.uRL.createMany({
    data: urlData,
  });
}
