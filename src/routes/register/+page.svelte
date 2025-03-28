<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  const signUpWithEmail = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else goto('/');
  };

  const signUpWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
  };
</script>

<h1>Registrieren</h1>

<input type="email" bind:value={email} placeholder="E-Mail" />
<input type="password" bind:value={password} placeholder="Passwort" />
<button on:click={signUpWithEmail}>📬 Registrieren</button>
<button on:click={signUpWithGoogle}>🔓 Mit Google registrieren</button>
