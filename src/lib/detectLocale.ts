import { getLocaleFromHeaders } from '@/lib/getLocaleFromHeaders';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRETl;

export async function detectLocale(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });
  const user = token?.user as User | undefined;

  if (user) {
    return user.locale;
  }

  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale) return cookieLocale;

  return getLocaleFromHeaders(req);
}
