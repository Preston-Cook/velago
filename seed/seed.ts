import { writePrisma } from '@/config/prismaWriteClient';
import { seedAccessability } from './seedAccessability';
import { seedAccounts } from './seedAccounts';
import { seedAddresses } from './seedAddresses';
import { seedAttributes } from './seedAttributes';
import { seedContacts } from './seedContacts';
import { seedCostOptions } from './seedCostOptions';
import { seedFunding } from './seedFunding';
import { seedLocations } from './seedLocations';
import { seedMetadata } from './seedMetadata';
import { seedMetaTableDescriptions } from './seedMetaTableDescriptions';
import { seedOrganizationIdentifiers } from './seedOrganizationIdentifiers';
import { seedOrganizations } from './seedOrganizations';
import { seedPhones } from './seedPhones';
import { seedRequiredDocuments } from './seedRequiredDocuments';
import { seedSchedules } from './seedSchedules';
import { seedServiceAreas } from './seedServiceAreas';
import { seedServiceCapacities } from './seedServiceCapacities';
import { seedServices } from './seedServices';
import { seedServicesAtLocations } from './seedServicesAtLocations';
import { seedTaxonomies } from './seedTaxonomies';
import { seedTaxonomyTerms } from './seedTaxonomyTerms';
import { seedUnits } from './seedUnits';
import { seedUrls } from './seedUrls';
import { seedUsers } from './seedUsers';

async function main() {
  // seed users
  await seedUsers();

  // seed accounts
  await seedAccounts();

  // seed organizations
  await seedOrganizations();

  // seed organization identifiers
  await seedOrganizationIdentifiers();

  // seed locations
  await seedLocations();

  // seed addresses
  await seedAddresses();

  // seed accessability
  await seedAccessability();

  // seed services
  await seedServices();

  // seed required documents
  await seedRequiredDocuments();

  // seed services at locations
  await seedServicesAtLocations();

  // seed phones
  await seedPhones();

  // seed schedules
  await seedSchedules();

  // seed service areas
  await seedServiceAreas();

  // seed funding
  await seedFunding();

  // seed cost options
  await seedCostOptions();

  // seed urls
  await seedUrls();

  // seed units
  await seedUnits();

  // seed service capacities
  await seedServiceCapacities();

  // seed contacts
  await seedContacts();

  // seed taxonomies
  await seedTaxonomies();

  // seed taxonomy terms
  await seedTaxonomyTerms();

  // seed meta table descriptions
  await seedMetaTableDescriptions();

  // seed attributes
  await seedAttributes();

  // seed metadata
  await seedMetadata();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await writePrisma.$disconnect();
    } catch (disconnectError) {
      console.error('Failed to disconnect from Prisma:', disconnectError);
    }
  });
