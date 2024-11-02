"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleSignIn, signUpWithEmail } from "@/app/firebase/auth";

const SignUp = () => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUpWithEmail(email, password);
      //   router.push("/p"); // Redirect to activity page or any desired page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col">
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
      <button onClick={handleGoogleSignUp} className="google-sign-in-btn">
        Sign up with Google
      </button>
    </div>
  );
};

export default SignUp;
