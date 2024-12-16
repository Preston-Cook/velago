import { readPrisma } from '@/config/prismaReadClient';
import { StatusType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  // TODO: incorporate search params

  let data;
  try {
    data = await readPrisma.location.findMany({
      where: {
        serviceAtLocation: {
          some: {},
        },
      },
      include: {
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
