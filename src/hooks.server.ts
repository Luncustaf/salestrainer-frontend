// src/hooks.server.ts
import { createClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return event.cookies.get(name);
        },
        set(name, value, options) {
          event.cookies.set(name, value, options);
        },
        remove(name, options) {
          event.cookies.delete(name, options);
        }
      }
    }
  );

  event.locals.supabase = supabase;

  const {
    data: { session }
  } = await supabase.auth.getSession();

  event.locals.session = session;

  return resolve(event);
};
