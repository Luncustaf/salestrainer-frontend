<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      // Optional: Kurze Pause und weiter zur App
      setTimeout(() => goto('/'), 1500);
    } else {
      // Fallback: zurück zum Login
      goto('/login');
    }
  });
</script>

<main>
  <h1>✅ Anmeldung erfolgreich</h1>
  <p class="subtitle">Du wirst gleich weitergeleitet...</p>
</main>
