"use client";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Signup with Email
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUpWithEmail(email, password, name, username);
      // Redirect or show success message
      // router.push("/p/activity");
    } catch (error) {
      setError(error.message);
    }
  };

  // Signup with Google
  const handleGoogleSignIn = async () => {
    setError(""); // Reset error state
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in with Google: " + err.message);
    }
  };

  return (
    <div className="flex claracontainer justify-center flex-col items-center min-h-screen">
      {/* Signup with Email */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 m-2"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 m-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 m-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 m-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 m-2">
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {/* Signup with Google */}
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
    </div>
  );
};

export default SignUp;
