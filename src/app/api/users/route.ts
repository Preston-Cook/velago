import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  const { id, email, phone, first_name, last_name } = await request.json();

  try {
    await prisma.user.update({
      where: { id },
      data: {
        email: email,
        phone: phone,
        firstName: first_name,
        lastName: last_name,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
