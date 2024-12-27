import { prisma } from '@/config/prisma';
import { StatusType } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  let data;
  try {
    data = await prisma.location.findMany({
      where: {
        serviceAtLocation: {
          some: {},
        },
      },
      include: {
        organization: true,
        serviceAtLocation: {
          where: {
            service: {
              status: StatusType.ACTIVE,
            },
          },
          include: {
            service: {
              include: {
                requiredDocuments: true,
              },
            },
          },
        },
        addresses: true,
        phones: true,
        accessability: true,
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 400 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
