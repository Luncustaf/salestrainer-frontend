// src/hooks.server.ts

import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const handle: Handle = async ({ event, resolve }) => {
  // Falls du später user-Session an event.locals anhängen willst:
  // const { data: { user } } = await supabase.auth.getUser();
  // event.locals.user = user;

  return resolve(event);
};
