// "use client";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) {
//       setError("Failed to sign in");
//     } else {
//       setError("");
//       window.location.href = "/";
//     }
//   };

//   return (
//     <div className="claracontainer w-full h-screen justify-center items-center flex flex-col">
//       <h1>Sign In</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Sign In</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

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
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);


    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      // Redirect or handle successful sign-in
    }

    // try {
    //   const { account } = await hygraphClient.request(
    //     SIGNIN_USER_QUERY,
    //     variables
    //   );

    //   if (account) {
    //     router.push("/dashboard");
    //   } else {
    //     setError("Invalid email or password");
    //   }
    // } catch (error) {
    //   console.error("GraphQL error:", error.response?.errors || error.message);
    //   setError("Signin failed. Try again.");
    // }
  }

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
