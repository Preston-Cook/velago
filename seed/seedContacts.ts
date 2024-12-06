import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Contact } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-contacts.csv');

export async function seedContacts() {
  const contactData = await readCsv<Contact>(filePath);

  return await writePrisma.contact.createMany({
    data: contactData,
  });
}
