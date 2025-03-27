<script lang="ts">
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isCalling = false;
  let isReady = false;

  const startVoIPCall = async () => {
    try {
      const res = await fetch('https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user');
      const { token } = await res.json();

      device = new Device(token, { debug: true });

      device.on('ready', () => {
        console.log('📞 Gerät bereit');
        isReady = true;

        // ✅ Anruf direkt starten
        const connection = device!.connect();
        isCalling = true;
        console.log('🚀 Anruf gestartet:', connection);
      });

      device.on('error', (err) => {
        console.error('❌ Fehler:', err);
        alert('Twilio-Fehler: ' + err.message);
      });

      device.on('disconnect', () => {
        console.log('📴 Anruf beendet');
        isCalling = false;
      });

      // ⛔️ Kein device.initialize() nötig in neuerer SDK-Version
    } catch (error) {
      console.error('Fehler beim Starten des Calls:', error);
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
  <h1>🎙️ VoIP-Anruf</h1>

  {#if !isCalling}
    <button on:click={startVoIPCall}>📞 Anrufen</button>
  {:else}
    <button on:click={hangUp}>📴 Auflegen</button>
  {/if}
</main>
