<script lang="ts">
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isCalling = false;
  let isInitialized = false;
  let email = "";

  const startVoIPCall = async () => {
    try {
      // Initialisiere Gerät nur beim ersten Klick
      if (!device && !isInitialized) {
        console.log("🔄 Initialisiere Gerät...");
        const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user');
        const { token } = await res.json();
        console.log("🔐 Token empfangen:", token);

        device = new Device(token, { debug: true });
        isInitialized = true;

        device.on('error', (err) => {
          console.error('❌ Twilio Fehler:', err);
          alert('Twilio Fehler: ' + err.message);
        });

        device.on('disconnect', () => {
          console.log('📴 Anruf beendet');
          isCalling = false;
        });
      }

      if (device) {
        console.log("📞 Starte Anruf...");
        const connection = device.connect();
        isCalling = true;
        console.log("✅ Verbindung gestartet:", connection);
      }

    } catch (error) {
      console.error("❌ Fehler beim Starten des Anrufs:", error);
    }
  };

  const hangUp = () => {
    if (device) {
      device.disconnectAll();
      isCalling = false;
      console.log("📴 Auflegen gedrückt.");
    }
  };

  const saveEmail = async () => {
    try {
      const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, identity: "browser-user" })
      });
      const result = await res.json();
      console.log("📨 E-Mail gespeichert:", result);
    } catch (err) {
      console.error("❌ Fehler beim Speichern der E-Mail:", err);
    }
  };
</script>



<!-- ✨ Layout -->
<div class="wrapper">
  <header>
    <div class="logo">TalkTra</div>
    <nav>
      <a href="#">Demo</a>
      <a href="#">Kontakt</a>
      <a href="#">Über uns</a>
      <!-- Logout-Link -->
      <a href="/logout">🚪 Logout</a>
    </nav>
  </header>

  <main>
    <h1>Trainiere realistische Verkaufsgespräche mit Talktra</h1>
    <p class="subtitle">Klicke jetzt auf <strong>„Anrufen“</strong> und trainiere deine Verkaufsgespräche in Echtzeit.</p>

{#if !isCalling}
  <button on:click={startVoIPCall}>📞 Anrufen</button>
{:else}
  <button on:click={hangUp}>📴 Auflegen</button>
{/if}


    <div class="email-section">
      <p>📧 Du möchtest die Auswertung als E-Mail erhalten?</p>
      <div class="email-box">
        <input type="email" bind:value={email} placeholder="Deine E-Mail für Feedback" />
        <button on:click={saveEmail}>✅ Speichern</button>
      </div>
    </div>
  </main>

  <footer>
    <div>
      <a href="#">Impressum</a> · <a href="#">Datenschutz</a>
    </div>
    <div>© Talktra – 2025</div>
  </footer>
</div>
<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #f6f8fb;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    background: #1c1b2e;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.3rem;
    font-weight: bold;
  }

  nav a {
    color: white;
    margin-left: 1.5rem;
    text-decoration: none;
    font-size: 0.95rem;
  }

  main {
    flex: 1;
    text-align: center;
    padding: 3rem 1rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #333;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  button {
    background-color: #007aff;
    border: none;
    color: white;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #005bb5;
  }

  .loading {
    margin-top: 1rem;
    color: #666;
  }

  .email-section {
    margin-top: 3rem;
    font-size: 0.95rem;
  }

  .email-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.8rem;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .email-box input {
    height: 46px;
    padding: 0 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 260px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .email-box button {
    height: 46px;
    padding: 0 1.4rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: #222;
    color: white;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .email-box button:hover {
    background-color: #444;
  }

  footer {
    padding: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px solid #eee;
    background: #fafafa;
  }

  footer a {
    color: #888;
    text-decoration: none;
    margin: 0 0.4rem;
  }
</style>
