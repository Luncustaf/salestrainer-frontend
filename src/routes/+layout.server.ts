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

  // Wenn bereits eine Session vorhanden ist und der Benutzer versucht, die Login- oder Registrierungsseite zu besuchen,
  // Weiterleitung zur Startseite oder Benutzerbereich
  if (session && ['/login', '/register'].includes(url.pathname)) {
    throw redirect(303, '/');
  }

  return {
    session
  };
};
