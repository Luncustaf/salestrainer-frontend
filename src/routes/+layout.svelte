<script>
  import "../app.css"; // falls du globale Styles verwendest
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  let session;

  onMount(async () => {
    // Session beim Laden holen
    const { data, error } = await supabase.auth.getSession();
    session = data?.session;
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
      <a href="/profile">Profil</a>
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
    <div>© Talktra – 2025</div>
  </footer>
</div>
