<script>
  import "../app.css"; // falls du globale Styles verwendest
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // Importiere goto für Weiterleitung

  let session;

  onMount(async () => {
    // Session beim Laden holen
    const { data, error } = await supabase.auth.getSession();
    session = data?.session;
  });

  const logout = async () => {
    await supabase.auth.signOut(); // Abmelden
    goto('/login'); // Nach dem Logout zur Login-Seite weiterleiten
  };
</script>

<div class="wrapper">
  <header>
    <div class="logo">TalkTra</div>
    <nav>
      <a href="/demo">Demo</a>
      <a href="/contact">Kontakt</a>
      <a href="/about">Über uns</a>
      {#if session}
        <a href="#" on:click={logout}>Logout</a> <!-- Fixe den Logout-Link -->
      {:else}
        <a href="/login">Login</a>
        <a href="/register">Registrieren</a>
      {/if}
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div>
      <a href="#">Impressum</a> · <a href="#">Datenschutz</a>
    </div>
    <div>© TalkTra – 2025</div>
  </footer>
</div>
