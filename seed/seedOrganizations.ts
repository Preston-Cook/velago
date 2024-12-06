import { writePrisma } from '@/config/prismaWriteClient';
import { readCsv } from '@/lib/readCsv';
import { Organization } from '@prisma/client';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/demo-organizations.csv');

export async function seedOrganizations() {
  let organizationData = await readCsv<Organization>(filePath);

  organizationData = organizationData.map((row) => {
    row['yearIncorporated'] = Number(row['yearIncorporated']);
    row['parentOrganizationId'] = null;
    return row;
  });

  await writePrisma.organization.createMany({
    data: organizationData,
  });
}
