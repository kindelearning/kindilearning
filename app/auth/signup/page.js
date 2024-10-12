"use client";
import { hygraphClient } from "@/lib/hygraph";
import { useRouter } from "next/navigation";
import { useState } from "react";

// queries/createUser.js
export const CREATE_USER_MUTATION = `
  mutation CreateUser($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const variables = { email, password };
      const { createAccount } = await hygraphClient.request(
        CREATE_USER_MUTATION,
        variables
      );

      if (createAccount) {
        // If signup is successful, redirect to login page or homepage
        router.push("/auth/signin"); // Redirect to signin after signup
      }
    } catch (error) {
      console.error("GraphQL error:", error.response?.errors || error.message);
      setError("Signup failed. Try again.");
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center ">
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
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
          <button type="submit">Sign Up</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}
