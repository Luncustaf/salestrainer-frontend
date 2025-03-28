<script lang="ts">
  export let data;
  const session = data.session;  // Session holen, um zu prüfen, ob der Benutzer eingeloggt ist
</script>

<header>
  <div class="logo">TalkTra</div>
  <nav>
    <a href="/demo">Demo</a>
    <a href="/kontakt">Kontakt</a>
    <a href="/about">Über uns</a>

    {#if session}
      <!-- Wenn der Benutzer eingeloggt ist, zeige Logout an -->
      <a href="/logout">📕 Logout</a>
    {:else}
      <!-- Wenn der Benutzer nicht eingeloggt ist, zeige Login und Registrieren an -->
      <a href="/login">Login</a>
      <a href="/register">Registrieren</a>
    {/if}
  </nav>
</header>

<main>
  <slot></slot> <!-- Der Content der Seite wird hier eingefügt -->
</main>

<footer>
  <p>© TalkTra – 2025</p>
</footer>

<style>
  header {
    background: #1c1b2e;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  nav a {
    color: white;
    margin-left: 1rem;
    text-decoration: none;
  }

  footer {
    padding: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px solid #eee;
    background: #fafafa;
  }
</style>
