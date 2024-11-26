import { notFound } from 'next/navigation';

export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    return notFound();
  }
}
