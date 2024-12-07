import { auth } from '@/config/auth';

export default async function MapPage() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}
