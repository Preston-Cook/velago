import { PrismaClient } from '@prisma/client';

const writePrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.AWS_AURORA_CLUSTER_WRITE_URL as string,
      },
    },
    log: ['query'],
  });
};

type WritePrismaClientSingleton = ReturnType<typeof writePrismaClient>;

const globalWritePrisma = globalThis as unknown as {
  writePrisma: WritePrismaClientSingleton | undefined;
};

export const writePrisma = globalWritePrisma.writePrisma ?? writePrismaClient();

if (process.env.NODE_ENV !== 'production')
  globalWritePrisma.writePrisma = writePrisma;
