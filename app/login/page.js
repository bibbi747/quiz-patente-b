"use client";

import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");

  async function loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (e) {
      setErrore(e.message);
    }
  }

  async function loginEmail(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      setErrore("Email o password non validi.");
    }
  }

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "60px auto",
        padding: 24,
      }}
    >
      <h1>Accedi</h1>

      <form onSubmit={loginEmail}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 12,
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
          }}
        >
          Accedi
        </button>

      </form>

      <button
        onClick={loginGoogle}
        style={{
          width: "100%",
          marginTop: 20,
          padding: 12,
        }}
      >
        Continua con Google
      </button>

      {errore && (
        <p style={{ color: "red", marginTop: 20 }}>
          {errore}
        </p>
      )}
    </main>
  );
}