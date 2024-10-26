"use client";

import { signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      // Handle successful login (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleGoogleSignIn = async () => {
    setError(""); // Reset error state
    try {
      await signInWithGoogle();
      router.push("/"); // Redirect to home or desired page
    } catch (err) {
      setError("Failed to sign in with Google: " + err.message);
    }
  };

  return (
    <div className="claracontainer flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h1 className="text-lg font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white rounded w-full p-2 hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
