<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let passwordConfirm = '';
  let errorMessage = '';

  const signUp = async () => {
    if (password !== passwordConfirm) {
      errorMessage = 'Die Passwörter stimmen nicht überein!';
      return;
    }

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      goto('/login'); // Weiterleitung nach erfolgreicher Registrierung
    }
  };
</script>

<main>
  <h1>Registrieren</h1>

  <form on:submit|preventDefault={signUp}>
    <div>
      <input type="email" id="email" bind:value={email} placeholder="E-Mail" required />
    </div>

    <div>
      <input type="password" id="password" bind:value={password} placeholder="Passwort" required />
    </div>

    <div>
      <input
        type="password"
        id="passwordConfirm"
        bind:value={passwordConfirm}
        placeholder="Passwort bestätigen"
        required
      />
    </div>

    {#if errorMessage}
      <div style="color: red;">{errorMessage}</div>
    {/if}

    <button type="submit">Registrieren</button>
  </form>

  <p>Bereits ein Konto? <a href="/login">Login</a></p>
</main>

