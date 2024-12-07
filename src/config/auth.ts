import { readPrisma } from '@/config/prismaReadClient';
import { writePrisma } from '@/config/prismaWriteClient';
import { generateOtp } from '@/lib/generateOtp';
import { sendText } from '@/lib/sendText';
import { otpSchema } from '@/schemas/otpSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      // @ts-expect-error next auth has not properly implemented its typing system for v5
      if (session.user && token.token.token.sub) {
        // @ts-expect-error next auth has not properly implemented its typing system for v5
        session.user.id = token.token.token.sub;
        // @ts-expect-error next auth has not properly implemented its typing system for v5
        session.user.role = token.token.token.role;
      }

      return session;
    },
    async jwt(token) {
      if (!token.token.sub) {
        return token;
      }

      const { sub } = token.token;

      const existingUser = await readPrisma.user.findFirst({
        where: { id: sub },
      });

      if (!existingUser) {
        return token;
      }

      token.token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(writePrisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      id: 'otp',
      name: 'OTP Login',
      credentials: {
        phone: { label: 'Phone Number', type: 'text' },
        otp: { label: 'OTP', type: 'text', optional: true },
      },
      async authorize(credentials) {
        const validatedFields = otpSchema.parse(credentials);

        const { phone, otp } = validatedFields;

        // OTP Request Flow
        if (otp === undefined) {
          try {
            // Generate OTP
            const otp = generateOtp();

            // Store OTP
            await storeOtp({ phone, otp });

            // Send OTP via your preferred method (SMS, etc.)
            await sendOtp({ phone, otp });

            // Return phone to indicate OTP request success
            return {
              message: 'success',
            };
          } catch (error) {
            console.error('OTP Send Error:', error);
            throw new Error('Failed to send OTP');
          }
        }

        // OTP Verification Flow
        const isValidOTP = await verifyOtp({
          phone,
          otp,
        });

        const { firstName, lastName, email } = validatedFields;

        if (isValidOTP) {
          const user = await findOrCreateUserByPhone({
            phone,
            firstName,
            lastName,
            email,
          });

          return {
            id: user.id,
            phone: phone,
          };
        }

        // Invalid OTP
        throw new Error('Invalid or expired OTP');
      },
    }),
  ],
});

interface StoreOtpParams {
  otp: string;
  phone: string;
}

async function storeOtp({ otp, phone }: StoreOtpParams) {
  const otpHash = await bcrypt.hash(otp, HASH_SALT_ROUNDS);

  const createdAt = new Date();
  const expirationTime = new Date(createdAt.getTime() + 10 * 60 * 1000); // current time + 10 mins

  const smsOtp = {
    phone,
    otpHash,
    createdAt,
    expirationTime,
    isUsed: false,
  };

  // user could be rerequesting an OTP or asking for one the first time
  await writePrisma.smsOtp.upsert({
    where: {
      phone,
    },
    update: {
      createdAt,
      expirationTime,
      otpHash,
    },
    create: smsOtp,
  });
}

interface SendOtpParams {
  otp: string;
  phone: string;
}

async function sendOtp({ otp, phone }: SendOtpParams) {
  const message = `Your OTP for Velago is ${otp}`;
  await sendText({ phone, message });
}

interface VerifyOtpParams {
  otp: string;
  phone: string;
}

async function verifyOtp({ otp, phone }: VerifyOtpParams) {
  const smsRecord = await readPrisma.smsOtp.findFirst({
    where: {
      phone,
    },
  });

  if (!smsRecord) {
    return false;
  }

  const { id } = smsRecord;

  // check if sms expired and delete if has
  if (smsRecord.expirationTime.getTime() < new Date().getTime()) {
    // delete old otp
    await writePrisma.smsOtp.delete({
      where: {
        id,
      },
    });

    return false;
  }

  // check if otps match
  const { otpHash } = smsRecord;

  // hash otp
  const matches = await bcrypt.compare(otp, otpHash);

  if (!matches) {
    return false;
  }

  // delete old otp and return return true
  await writePrisma.smsOtp.delete({
    where: {
      id,
    },
  });

  return true;
}

interface FindOrCreateUserByPhoneParams {
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

async function findOrCreateUserByPhone({
  phone,
  firstName,
  lastName,
  email,
}: FindOrCreateUserByPhoneParams) {
  // try to find user by phone
  let user;

  user = await readPrisma.user.findFirst({
    where: { phone },
  });

  if (!user) {
    user = await writePrisma.user.create({
      data: {
        phone,
        firstName,
        lastName,
        email,
      },
    });
  }

  return user;
}

export const HASH_SALT_ROUNDS = 10;

export const OTP_LENGTH = 6;
