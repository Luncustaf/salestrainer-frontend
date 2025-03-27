<script lang="ts">
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isCalling = false;
  let isReady = false;

  const startVoIPCall = async () => {
    try {
      console.log("🚀 Starte VoIP-Anruf...");

      const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user');
      const data = await res.json();
      const token = data.token;

      if (!token) {
        console.error("❌ Kein Token empfangen:", data);
        alert("Fehler: Kein gültiger Token vom Server.");
        return;
      }

      console.log("🔐 Token empfangen:", token.slice(0, 20) + "...");

      device = new Device(token, { debug: true });

      device.on('registered', () => {
        console.log("✅ [Twilio] Gerät registriert.");
      });

      device.on('ready', () => {
        console.log("📞 [Twilio] Gerät bereit – versuche Verbindung herzustellen...");
        isReady = true;

        const connection = device!.connect();
        console.log("🚀 Verbindung gestartet:", connection);
        isCalling = true;
      });

      device.on('connect', (conn) => {
        console.log("🔊 Verbindung hergestellt:", conn.parameters);
      });

      device.on('disconnect', () => {
        console.log("📴 Verbindung beendet");
        isCalling = false;
      });

      device.on('error', (err) => {
        console.error("❌ Twilio Fehler:", err);
        alert("Fehler beim Anruf: " + err.message);
      });

    } catch (error) {
      console.error("❌ Fehler beim Starten:", error);
    }
  };

  const hangUp = () => {
    console.log("📴 Auflegen gedrückt.");
    if (device) {
      device.disconnectAll();
      isCalling = false;
    }
  };
</script>

<main>
  <h1>🎙️ VoIP-Anruf aus dem Browser</h1>

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

  button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #005bb5;
  }
</style>
