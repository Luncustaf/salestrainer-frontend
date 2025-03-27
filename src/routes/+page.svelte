<script lang="ts">
  import { onMount } from 'svelte';
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isReady = false;
  let isCalling = false;
  let email = "";

  const identity = "browser-user";

  const startVoIPCall = async () => {
    console.log("🚀 Starte VoIP-Anruf...");

    try {
      const res = await fetch(`https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=${identity}`);
      const { token } = await res.json();
      console.log("🔐 Token empfangen:", token);

      const emailRes = await fetch("https://salestrainer-test-8773dee9bf25.herokuapp.com/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, identity })
      });
      const emailData = await emailRes.json();
      console.log("📧 E-Mail gespeichert:", emailData);

      device = new Device(token, { debug: true });

      device.on("ready", () => {
        console.log("✅ Gerät registriert – Verbindung wird aufgebaut...");
        isReady = true;
        const connection = device!.connect();
        console.log("🚀 Verbindung gestartet:", connection);
        isCalling = true;
      });

      device.on("error", (err) => {
        console.error("❌ Twilio Fehler:", err);
        alert("Twilio Fehler: " + err.message);
      });

      device.on("disconnect", () => {
        console.log("📴 Verbindung beendet.");
        isCalling = false;
      });

      device.initialize();
    } catch (error) {
      console.error("❌ Fehler beim Starten des Anrufs:", error);
    }
  };

  const hangUp = () => {
    if (device) {
      console.log("📴 Auflegen gedrückt.");
      device.disconnectAll();
      isCalling = false;
    }
  };
</script>

<main>
  <nav>
    <div class="logo">talktra</div>
    <div class="menu">
      <span>Demo</span>
      <span>Kontakt</span>
      <span>Über uns</span>
    </div>
  </nav>

  <section class="centered">
    <h1>🎙️ VoIP-Anruf aus dem Browser</h1>

    <input
      type="email"
      bind:value={email}
      placeholder="Deine E-Mail für Feedback"
    />

    {#if !isCalling}
      <button on:click={startVoIPCall}>📞 Anrufen</button>
    {:else}
      <button on:click={hangUp} class="hangup">📴 Auflegen</button>
    {/if}
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f7f9fc;
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #1e1e2f;
    color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .logo {
    font-weight: bold;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
  }

  .menu span {
    margin-left: 1.5rem;
    cursor: pointer;
    font-size: 0.95rem;
    color: #ccc;
    transition: color 0.2s ease;
  }

  .menu span:hover {
    color: white;
  }

  .centered {
    text-align: center;
    padding-top: 6rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    width: 300px;
    max-width: 90%;
  }

  button {
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  button:hover {
    background-color: #005bb5;
  }

  .hangup {
    background-color: #e94343;
  }

  .hangup:hover {
    background-color: #c73232;
  }
</style>
