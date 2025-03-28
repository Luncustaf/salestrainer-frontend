import { redirect } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, cookies }) => {
  const supabase = createServerClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) {
        return cookies.get(name);
      },
      set(name, value, options) {
        cookies.set(name, value, options);
      },
      remove(name, options) {
        cookies.delete(name, options);
      }
    }
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect(303, '/login');
  }

  return { user: session.user };
};
