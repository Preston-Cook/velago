import { cleanPhone } from '@/lib/cleanPhone';
import prisma from '@/lib/db';
import { sendContactEmail } from '@/lib/resend';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const { firstName, lastName, phone, email, message } = await request.json();
  const cleanedPhone = cleanPhone(phone);

  // try {
  //   await prisma.contactMessage.create({
  //     data: {
  //       firstName,
  //       lastName,
  //       phone: cleanedPhone,
  //       email,
  //       message,
  //     },
  //   });
  // } catch (err) {
  //   return NextResponse.json({ message: 'bad request' }, { status: 400 });
  // }

  // TODO: send a message to velago email with contact message with resend

  const resend = new Resend(process.env.RESEND_API_KEY as string);

  const res = await resend.emails.send({
    from: 'info@velago.org',
    to: ['preston.l.cook@gmail.com'],
    subject: 'hello world',
    html: '<p>it works!</p>',
  });

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
