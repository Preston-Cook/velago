import { prisma } from '@/config/prisma';
import { readCsv } from '@/lib/readCsv';
import { OrganizationIdentifier } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(
  __dirname,
  '../data/demo-organization-identifiers.csv',
);

export async function seedOrganizationIdentifiers() {
  const organizationIdentifierData =
    await readCsv<OrganizationIdentifier>(filePath);

  return await prisma.organizationIdentifier.createMany({
    data: organizationIdentifierData,
  });
}
