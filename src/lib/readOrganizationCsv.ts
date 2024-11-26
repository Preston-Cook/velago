import path from 'path';
import { handleEmpty } from './handleEmpty';
import { readCsv } from './readCsv';

interface UncleanOrgData {
  id?: string;
  organizationStatus: boolean | string;
  name: string;
  alternateName: string | null;
  description: string | null;
  email: string | null;
  website: string | null;
  taxStatus: string | null;
}

interface OrganizationData {
  organizationStatus: boolean | undefined;
  name: string;
  alternateName: string | null;
  description: string | null;
  email: string | null;
  website: string | null;
  taxStatus: string | null;
}

const organizationHeaders = [
  'id',
  'organizationStatus',
  'name',
  'alternateName',
  'description',
  'email',
  'website',
  'taxStatus',
];

export async function readOrganizationCsv(): Promise<OrganizationData[]> {
  const filePath = path.resolve(process.cwd(), 'data', 'organization-data.csv');
  const csvData = await readCsv<UncleanOrgData>(filePath, organizationHeaders);

  return csvData.map((org) => ({
    organizationStatus: org.organizationStatus === 'active',
    name: org.name,
    alternateName: handleEmpty(org.alternateName),
    description: handleEmpty(org.description),
    email: handleEmpty(org.email),
    website: handleEmpty(org.website),
    taxStatus: handleEmpty(org.taxStatus),
  }));
}
