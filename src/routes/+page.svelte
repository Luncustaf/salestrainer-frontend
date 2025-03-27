<script lang="ts">
  import { Device } from '@twilio/voice-sdk';
  import { onMount } from 'svelte';

  let device: Device | null = null;
  let isCalling = false;
  let isReady = false;
  let email = '';

  const saveEmail = async () => {
    try {
      const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, identity: "browser-user" })
      });
      const data = await res.json();
      console.log("📧 E-Mail gespeichert:", data);
    } catch (err) {
      console.error("❌ Fehler beim Speichern der E-Mail:", err);
    }
  };

  const startVoIPCall = async () => {
    try {
      console.log("🚀 Starte VoIP-Anruf...");
      const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user');
      const data = await res.json();
      const token = data.token;

      if (!token) {
        console.error("❌ Kein Token erhalten");
        return;
      }

      console.log("🔐 Token empfangen:", token.slice(0, 20) + "...");
      device = new Device(token, { debug: true });

      device.on('registered', () => {
        console.log("✅ Gerät registriert – Verbindung wird aufgebaut...");
        const connection = device!.connect();
        isCalling = true;
        console.log("🚀 Verbindung gestartet:", connection);
      });

      device.on('ready', () => {
        console.log("📞 Twilio-Gerät bereit");
        isReady = true;
      });

      device.on('connect', () => {
        console.log("🔊 Verbindung steht");
      });

      device.on('disconnect', () => {
        console.log("📴 Verbindung beendet");
        isCalling = false;
      });

      device.on('error', (err) => {
        console.error("❌ Twilio Fehler:", err);
        alert("Fehler: " + err.message);
      });

      await device.register(); // ← WICHTIG
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
  <h1>🎙️ VoIP-Anruf aus dem Browser</h1>

  <label>
    Deine E-Mail:
    <input bind:value={email} placeholder="z. B. max@example.com" />
  </label>

  <button on:click={saveEmail}>💾 E-Mail speichern</button>

  {#if !isCalling}
    <button on:click={startVoIPCall}>📞 Anrufen</button>
  {:else}
    <button on:click={hangUp}>📴 Auflegen</button>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    font-family: sans-serif;
  }

  label, input, button {
    margin-top: 1rem;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 250px;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005bb5;
  }
</style>
