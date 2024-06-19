import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import prisma from '@/lib/db';

export async function GET(request: Request, response: Response) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';
  const role = searchParams.get('role') ?? 'user';
  const action = searchParams.get('action');

  if (!action || !['signUp', 'signIn'].includes(action)) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/signin/user?error=400`);
    }

    // get email from google data
    const email = data?.user?.email;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (action === 'signUp') {
      if (user) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/signup/${role}?error=409`);
      }

      let first, last;

      const fullName = data.user.user_metadata.full_name;

      const pieces = fullName?.split(' ');

      if (pieces?.length === 2) {
        [first, last] = pieces;
      } else if (pieces?.length > 2) {
        first = pieces[0];
        last = pieces.slice(1).join(' ');
      } else {
        first = null;
        last = null;
      }

      const id = data.user.id;

      // the user was signing up
      try {
        await prisma.user.update({
          where: { id },
          data: { email, firstName: first, lastName: last },
        });
      } catch (err) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/signin/${role}?error=400`);
      }
    } else if (action === 'signIn') {
      if (!user || user.provider !== 'google') {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/signin/${role}?error=404`);
      }
    }

    return NextResponse.redirect(`${origin}${next}`);
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
