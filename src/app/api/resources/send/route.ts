import { sendTextMessage } from '@/lib/sendTextMessage';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // const body = await request.json();
  await sendTextMessage({
    to: '+19728377554',
    body: 'This is a test',
  });

  return NextResponse.json({ message: 'sent' }, { status: 201 });
}
