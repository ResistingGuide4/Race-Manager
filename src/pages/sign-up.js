import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

import { createClient } from "/utils/supabase/component";

export default function signUp() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { signUpError } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: {
        data: {
          role: 'admin'
        }
      }
    });
    if (signUpError) {
      console.error(signUpError);
    }
    router.push("/dashboard");
  }

  return (
    <main>
      <Head>
        <title>Sign Up</title>
      </Head>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={signUp}>
          Sign up
        </button>
      </form>
    </main>
  );
}
