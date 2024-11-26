import { writePrisma } from '@/config/prismaWriteClient';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(writePrisma),
  session: {
    strategy: 'jwt',
  },
  providers: [],
  callbacks: {
    authorized: () => {
      return true;
    },
  },
});
