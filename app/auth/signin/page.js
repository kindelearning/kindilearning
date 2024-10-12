"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gql } from "graphql-request";

const SIGNIN_USER_QUERY = gql`
  query SigninUser($email: String!, $password: String!) {
    account(where: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
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
        <button type="submit">Sign In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
