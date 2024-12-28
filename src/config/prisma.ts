import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

const createPrisma = (): PrismaClient => {
  return new PrismaClient({ adapter, log: ['query'] });
};

type PrismaSingleton = ReturnType<typeof createPrisma>;

const globalPrisma = globalThis as unknown as {
  prisma: PrismaSingleton | undefined;
};

export const prisma = globalPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;
