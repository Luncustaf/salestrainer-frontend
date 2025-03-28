// src/hooks.server.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return event.cookies.get(name);
        },
        set(name, value, options) {
          event.cookies.set(name, value, options as CookieOptions);
        },
        remove(name, options) {
          event.cookies.delete(name, options as CookieOptions);
        }
      }
    }
  );

  return resolve(event);
};
