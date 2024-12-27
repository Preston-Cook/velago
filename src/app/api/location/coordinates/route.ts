import { prisma } from '@/config/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.location.findMany({
    select: {
      latitude: true,
      longitude: true,
    },
    distinct: ['latitude', 'longitude'],
  });

  return NextResponse.json(data, { status: 200 });
}
