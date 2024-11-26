import { readOrganizationCsv } from '@/lib/readOrganizationCsv';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/db';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return notFound();
  }

  const data = await readOrganizationCsv();
  await prisma.organization.createMany({ data });

  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
