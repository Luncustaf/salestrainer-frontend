<script>
  import "../app.css"; // falls du globale Styles verwendest
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
