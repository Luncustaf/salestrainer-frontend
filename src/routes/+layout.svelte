<header>
  <div class="logo">TalkTra</div>
  <nav>
    <a href="/contact">Kontakt</a>
    <a href="/login">Login</a>
  </nav>
</header>

<main>
  <slot />
</main>

<style>
  header {
    background-color: #333;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav a {
    color: white;
    margin-left: 1rem;
    text-decoration: none;
  }

  nav a:hover {
    text-decoration: underline;
  }

  main {
    padding-top: 60px; /* Platz für fixierten Header, falls nötig */
  }
</style>
