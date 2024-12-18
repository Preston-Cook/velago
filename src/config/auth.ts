import { readPrisma } from '@/config/prismaReadClient';
import { writePrisma } from '@/config/prismaWriteClient';
import { InvalidOrExpiredOtpError, OtpSendError } from '@/lib/customErrors';
import { generateOtp } from '@/lib/generateOtp';
import { sendText } from '@/lib/sendText';
import { otpSchema } from '@/schemas/otpSchema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        const { firstName, lastName, role, phone, locale } = token;
        session.user.firstName = firstName as string | undefined;
        session.user.lastName = lastName as string | undefined;
        session.user.role = role as string | undefined;
        session.user.phone = phone as string | undefined;
        session.user.locale = locale as string | undefined;
      }

      return session;
    },
    async jwt({ token }) {
      const { sub } = token;

      if (!token.sub) {
        return token;
      }

      const currentUser = await readPrisma.user.findFirst({
        where: { id: sub },
      });

      if (!currentUser) {
        return token;
      }

      const { locale, phone, role, email, firstName, lastName } = currentUser;

      token.locale = locale;
      token.phone = phone;
      token.role = role;
      token.email = email;
      token.firstName = firstName;
      token.lastName = lastName;
      token.name = `${firstName} ${lastName}` || undefined;

      return token;
    },
  },
  adapter: PrismaAdapter(writePrisma),
  session: {
    strategy: 'jwt',
  },
  events: {
    async linkAccount({ user }) {
      await writePrisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
          } catch {
            throw new OtpSendError();
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
        throw new InvalidOrExpiredOtpError();
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
