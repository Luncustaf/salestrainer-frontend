// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = locals.session;
  console.log('🔍 Session in layout.server.ts:', session);
  console.log('🔍 Aktueller Pfad:', url.pathname);
  
  // Wenn keine Session vorhanden → redirect zur Login-Seite
  if (!session && !['/login', '/auth-success'].includes(url.pathname)) {
    throw redirect(303, '/login');
  }
  

  return {
    session
  };
};
