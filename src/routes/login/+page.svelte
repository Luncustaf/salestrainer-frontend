<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  const signInWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) goto('/');
    else alert(error.message);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    if (error) alert(error.message);
  };
</script>

<h1>Login</h1>

<input type="email" bind:value={email} placeholder="E-Mail" />
<input type="password" bind:value={password} placeholder="Passwort" />
<button on:click={signInWithEmail}>🔐 Login</button>
<button on:click={signInWithGoogle}>🔓 Login mit Google</button>
