import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  let user;

  try {
    user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: { role: true },
    });
  } catch (err) {
    return NextResponse.json({ message: 'bad request' }, { status: 400 });
  }

  // ensure user exists
  if (!user) {
    return NextResponse.json({ message: 'not found' }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}

export async function POST(req: Request) {
  const { id, email, phone, first_name, last_name } = await req.json();

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
