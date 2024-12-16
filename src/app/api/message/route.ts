import { sendText } from '@/lib/sendText';
import { NextResponse } from 'next/server';

export async function POST() {
  await sendText({
    phone: '+19728377554',
    message: 'This is a sample text',
  });

  return NextResponse.json({ message: 'success' }, { status: 200 });
}
