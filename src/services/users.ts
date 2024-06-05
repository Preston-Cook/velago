export async function signOutUser() {
  const res = await fetch('/api/auth/signout', { method: 'POST' });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
}
