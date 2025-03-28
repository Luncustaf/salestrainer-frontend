<script>
  import "../app.css"; // falls du globale Styles verwendest
</script>

<div class="wrapper">
  <header>
    <div class="logo">TalkTra</div>
    <nav>
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/register">Registrieren</a>
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
