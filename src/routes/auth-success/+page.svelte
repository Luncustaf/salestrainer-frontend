<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  console.log("✅ auth-success route loaded");

  onMount(async () => {
    // Versuche sofort, die Session zu bekommen
    const { data, error } = await supabase.auth.getSession();
    console.log('Direkt nach Google Login - Session:', data);

    if (data?.session) {
      goto('/');
    } else {
      // Warte kurz, falls Supabase noch nicht vollständig initialisiert ist
      setTimeout(async () => {
        const retry = await supabase.auth.getSession();
        console.log('Retry nach 1.5s - Session:', retry.data);

        if (retry.data?.session) {
          goto('/');
        } else {
          goto('/login');
        }
      }, 1500);
    }
  });
</script>

<main>
  <h1>🔄 Einen Moment bitte...</h1>
  <p>Du wirst gleich weitergeleitet...</p>
</main>

<style>
  main {
    text-align: center;
    padding: 4rem 1rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  p {
    color: #555;
    margin-top: 1rem;
  }
</style>
