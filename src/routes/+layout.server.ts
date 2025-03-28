// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = locals.session;

  // Wenn keine Session vorhanden → redirect zur Login-Seite
  if (!session && url.pathname !== '/login') {
    throw redirect(303, '/login');
  }

  return {
    session
  };
};
