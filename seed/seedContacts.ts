import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { Contact } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-contacts.csv');

export async function seedContacts() {
  const contactData = await readCsv<Contact>(filePath);

  return await prisma.contact.createMany({
    data: contactData,
  });
}
