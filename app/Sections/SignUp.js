"use client";

import { signUpWithEmail } from "@/lib/auth";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      // Handle successful signup (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
