<script lang="ts">
  import { Device } from '@twilio/voice-sdk';

  let device: Device | null = null;
  let isReady = false;
  let isCalling = false;
  let email = '';

  const startVoIPCall = async () => {
    try {
      if (!email || !email.includes('@')) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }

      const res = await fetch(`https://salestrainer-test-8773dee9bf25.herokuapp.com/token?identity=browser-user&email=${encodeURIComponent(email)}`);
      const { token } = await res.json();

      device = new Device(token, { debug: true });

      device.on('ready', () => {
        console.log('📞 Gerät bereit');
        isReady = true;

        const connection = device!.connect();
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

  <input type="email" bind:value={email} placeholder="Deine E-Mail-Adresse" required />

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

  input {
    padding: 0.8rem;
    font-size: 1rem;
    width: 300px;
    max-width: 90%;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #005bb5;
  }
</style>
