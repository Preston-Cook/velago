import { createSbServerClient } from '../lib/sbServerClient';

export async function getCurrentUser() {
  const sbServerClient = createSbServerClient();
  const currentUser = await sbServerClient.auth.getUser();
  const { user } = currentUser.data;
  return user;
}
