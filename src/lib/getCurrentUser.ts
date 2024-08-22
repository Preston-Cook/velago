import { createSbServerClient } from '../lib/sbServerClient';

export async function getCurrentUser() {
  const supabase = createSbServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { id } = user;

  return supabase.from('user').select('*').eq('id', id);
}
