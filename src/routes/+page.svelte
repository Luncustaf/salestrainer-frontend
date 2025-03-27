<script lang="ts">
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isReady = false;
  let isCalling = false;

  const startVoIPCall = async () => {
    try {
      // Initialisiere Gerät nur beim ersten Klick
      if (!device) {
        const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user');
        const { token } = await res.json();

        device = new Device(token, { debug: true });

        device.on('ready', () => {
          console.log('📞 Gerät bereit');
          isReady = true;

          const connection = device!.connect(); // Startet direkt nach .ready
          isCalling = true;
          console.log('🚀 Anruf gestartet:', connection);
        });

        device.on('error', (err) => {
          console.error('❌ Twilio Fehler:', err);
          alert('Twilio Fehler: ' + err.message);
        });

        device.on('disconnect', () => {
          console.log('📴 Anruf beendet');
          isCalling = false;
        });
      } else {
        const connection = device.connect();
        isCalling = true;
        console.log('🚀 Anruf gestartet (reconnect):', connection);
      }
    } catch (error) {
      console.error('❌ Fehler beim Starten des Anrufs:', error);
      alert('Fehler beim Starten des Anrufs.');
    }
  };

  const hangUp = () => {
    if (device) {
      device.disconnectAll();
      isCalling = false;
    }
  };
</script>

<main>
  <h1>🎙️ VoIP-Anruf aus dem Browser</h1>

  {#if !isCalling}
    <button on:click={startVoIPCall}>
      {device ? '📞 Anrufen' : '🎬 Gerät starten & Anrufen'}
    </button>
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
