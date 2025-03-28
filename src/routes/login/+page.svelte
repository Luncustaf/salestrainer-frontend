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
        redirectTo: 'https://salestrainer.vercel.app/auth-success'
      }
    });
    if (error) alert(error.message);
  };
  
  

</script>

<main>
  <h1>Login</h1>
  <div class="email-box">
    <input type="email" bind:value={email} placeholder="E-Mail" />
    <input type="password" bind:value={password} placeholder="Passwort" />
  </div>
  <div class="email-box">
    <button on:click={signInWithEmail}>🔐 Login</button>
    <button on:click={signInWithGoogle}>🔓 Login mit Google</button>
  </div>
</main>
