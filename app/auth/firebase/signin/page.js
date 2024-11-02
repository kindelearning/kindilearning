"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleSignIn, loginWithEmail } from "@/app/firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      const user = await googleSignIn();
      console.log("Google Sign-Up Successful:", user);
      // Optional: Redirect user to dashboard or desired page
    } catch (error) {
      console.error("Google Sign-Up Failed:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginWithEmail(email, password);
      router.push("/p/activity"); // Redirect to activity page or any desired page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col">
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
          Log In
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleGoogleSignUp} className="google-sign-in-btn">
        Sign up with Google
      </button>
    </div>
  );
};

export default Login;
