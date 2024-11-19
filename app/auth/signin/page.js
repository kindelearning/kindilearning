"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting starts

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Sign In Response:", res); // Add this line for more insight
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password.");
      setLoading(false); // Set loading to false if there's an error
      console.log("Signin failed", res);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center ">
      <form onSubmit={handleSignin}>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}{" "}
          {/* Change button text based on loading state */}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
