import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // TODO: sent request to resend api to send email
  const { orgName, email, description, additionalInfo } = await req.json();

  console.log(orgName, email, description, additionalInfo);

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
