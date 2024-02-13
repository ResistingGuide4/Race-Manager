import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

import { createClient } from "/utils/supabase/component";

export default function signUp() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    } else {
      router.push("/dashboard");
    }

  }

  return (
    <main>
      <Head>
        <title>Log In</title>
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
        <button type="button" onClick={logIn}>
          Log in
        </button>
      </form>
    </main>
  );
}
