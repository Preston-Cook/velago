import { PrismaClient } from '@prisma/client';

const readPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.AWS_AURORA_CLUSTER_READ_URL as string,
      },
    },
  });
};

type ReadPrismaClientSingleton = ReturnType<typeof readPrismaClient>;

const globalReadPrisma = globalThis as unknown as {
  readPrisma: ReadPrismaClientSingleton | undefined;
};

const readPrisma = globalReadPrisma.readPrisma ?? readPrismaClient();

export default readPrisma;

if (process.env.NODE_ENV !== 'production')
  globalReadPrisma.readPrisma = readPrisma;
