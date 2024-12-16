import { readPrisma } from '@/config/prismaReadClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await readPrisma.location.findMany({
    select: {
      latitude: true,
      longitude: true,
    },
    distinct: ['latitude', 'longitude'],
  });

  return NextResponse.json(data, { status: 200 });
}
