<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let passwordConfirm = '';

  const registerUser = async () => {
    if (password !== passwordConfirm) {
      alert('Die Passwörter stimmen nicht überein');
      return;
    }

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // Nach der erfolgreichen Registrierung weiterleiten
      goto('/login');
    }
  };
</script>

<main>
  <h1>Registrieren</h1>
  <div class="input-container">
    <input type="email" bind:value={email} placeholder="E-Mail" />
    <input type="password" bind:value={password} placeholder="Passwort" />
    <input type="password" bind:value={passwordConfirm} placeholder="Passwort bestätigen" />
  </div>
  <button class="register-btn" on:click={registerUser}>🔐 Registrieren</button>
  <p>Bereits ein Konto? <a href="/login">Login</a></p>
</main>

<style>
  main {
    text-align: center;
    padding: 2rem 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .register-btn {
    background-color: #444;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;
  }

  .register-btn:hover {
    background-color: #333;
  }

  p {
    margin-top: 1rem;
  }

  a {
    color: #007aff;
    text-decoration: none;
  }
</style>
