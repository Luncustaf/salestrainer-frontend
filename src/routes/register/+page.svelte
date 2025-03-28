<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  const signUpWithEmail = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    if (!error) {
      alert('Bitte bestätige deine E-Mail-Adresse!');
      goto('/');
    } else {
      alert(error.message);
    }
  };

  const signUpWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) alert(error.message);
  };
</script>

<main>
  <h1>Registrieren</h1>
  <div class="email-box">
    <input type="email" bind:value={email} placeholder="E-Mail" />
    <input type="password" bind:value={password} placeholder="Passwort" />
  </div>
  <div class="email-box">
    <button on:click={signUpWithEmail}>🆕 Registrieren</button>
    <button on:click={signUpWithGoogle}>🔓 Mit Google registrieren</button>
  </div>
</main>
