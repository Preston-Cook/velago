import { NextResponse } from 'next/server';

export function POST(req: Request) {
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
