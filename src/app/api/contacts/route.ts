import { cleanPhone } from '@/lib/cleanPhone';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { firstName, lastName, phone, email, message } = await request.json();
  const cleanedPhone = cleanPhone(phone);

  try {
    await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        phone: cleanedPhone,
        email,
        message,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  // TODO: send a message to velago email with contact message with resend

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
