import { NextResponse } from 'next/server';
import contactFormSchema from '@/schemas/contactSchema';
import { ZodError } from 'zod';

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

  // send email to velago owners

  return NextResponse.json({ msg: 'created' }, { status: 201 });
}
