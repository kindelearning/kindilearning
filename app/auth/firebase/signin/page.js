"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail, signUpWithGoogle } from "@/app/firebase/auth"; // Ensure this export exists

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    const response = await signUpWithGoogle();

    if (response.success) {
      const { email, name } = response.user;

      // Log user data
      console.log("User Data from Google:", { email, name });

      try {
        // Check if user already exists in Hygraph
        const userExists = await checkIfUserExists(email); // Implement this function
        if (!userExists) {
          // Create the user in Hygraph
          const createUserResponse = await createUserInHygraph(
            email,
            name,
            "GoogleSignIn"
          );
          console.log("Create User Response:", createUserResponse); // Log response to check for errors
        } else {
          setMessage("User already exists.");
        }

        // Open home page in a new tab
        window.open("/home", "_blank");
      } catch (error) {
        console.error("Error during user check or creation:", error);
        setError("An error occurred during sign-up.");
      }
    } else {
      alert(response.message || "An error occurred during Google sign-in.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      await loginWithEmail(email, password);
      setMessage("Login successful! Redirecting...");
      router.push("/p/activity"); // Redirect to activity page or any desired page
    } catch (error) {
      setError(error.message || "An error occurred during login.");
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
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <button
        onClick={handleGoogleSignIn}
        className="clara-button google-signin-button"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
