import { NextResponse } from 'next/server';

export async function GET(requeset: Request) {
  return NextResponse.json({ message: 'I was hit' }, { status: 200 });
}
