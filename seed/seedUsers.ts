import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { User } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-users.csv');

export async function seedUsers() {
  const userData = await readCsv<User>(filePath);

  await writePrisma.user.createMany({
    data: userData,
  });
}
