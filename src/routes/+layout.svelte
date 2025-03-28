<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import "../app.css";  // Falls du globale Styles verwendest

  let session = null;

  // Check session on initial load
  onMount(async () => {
    const { data, error } = await supabase.auth.getSession();
    session = data?.session;

    // Listen for changes in session
    supabase.auth.onAuthStateChange((event, sessionData) => {
      session = sessionData;
    });
  });

  const logout = async () => {
    await supabase.auth.signOut();
    goto('/login');
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
        <a href="#" on:click={logout}>Logout</a>
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
