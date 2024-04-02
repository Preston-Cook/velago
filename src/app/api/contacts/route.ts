import { NextResponse } from 'next/server';
import contactFormSchema from '@/schemas/contactSchema';
import { ZodError } from 'zod';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { PostgresError } from 'postgres';
import { sendContact } from '@/lib/resend';

export async function POST(request: Request) {
  const body = await request.json();

  // validate json data
  try {
    contactFormSchema.parse(body);
  } catch (err) {
    return NextResponse.json(
      { error: (err as ZodError).flatten().fieldErrors },
      {
        status: 400,
      },
    );
  }

  // save contact to db using drizzle
  try {
    await db.insert(contacts).values(body);
  } catch (err) {
    return NextResponse.json(
      { error: (err as PostgresError).message },
      { status: 400 },
    );
  }

  // send email to velago owners
  try {
    await sendContact(body);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 },
    );
  }

  return NextResponse.json({ msg: 'created' }, { status: 201 });
}
