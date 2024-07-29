import { createSbServerClient } from '../lib/sbServerClient';

export async function getCurrentUser() {
  const supabase = createSbServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const {
    user: { id },
  } = session;

  return supabase.from('user').select('*').eq('id', id);
}
