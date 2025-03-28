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
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} placeholder="E-Mail" required />
    </div>

    <div>
      <label for="password">Passwort</label>
      <input type="password" id="password" bind:value={password} placeholder="Passwort" required />
    </div>

    <div>
      <label for="passwordConfirm">Passwort bestätigen</label>
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

<style>
  main {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  form div {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #007aff;
    color: white;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }

  button:hover {
    background-color: #005bb5;
  }

  p {
    margin-top: 1rem;
  }
</style>
