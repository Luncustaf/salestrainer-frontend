import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  const cookieOptions: CookieOptions = {
    path: '/',
    secure: !dev
  };

  const supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return event.cookies.get(name);
        },
        set(name, value, options) {
          event.cookies.set(name, value, { ...cookieOptions, ...options });
        },
        remove(name, options) {
          event.cookies.delete(name, { ...cookieOptions, ...options });
        }
      }
    }
  );

  event.locals.supabase = supabase;

  // ⬇️ Session holen und auf event.locals speichern
  const {
    data: { session }
  } = await supabase.auth.getSession();

  event.locals.session = session;

  return resolve(event);
};
