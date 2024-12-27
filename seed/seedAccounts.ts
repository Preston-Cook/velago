import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Account } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-accounts.csv');

export async function seedAccounts() {
  const accountData = await readCsv<Account>(filePath);

  await prisma.account.createMany({
    data: accountData,
  });
}
