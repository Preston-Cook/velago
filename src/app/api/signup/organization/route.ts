import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/db';

export async function POST(req: Request) {
  const { orgName, email, description, additionalInfo } = await req.json();

  try {
    await prisma.signUpMessage.create({
      data: {
        orgName,
        email,
        description,
        additionalInfo,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  // TODO: sent request to resend api to send email

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
