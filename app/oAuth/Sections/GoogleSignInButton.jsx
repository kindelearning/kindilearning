"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import firebaseApp from "@/app/firebase/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { Google } from "@/public/Images";

const GoogleSignUp = () => {
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Send the token to your Strapi backend for verification
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();

      // Check if response is okay and process the JWT token
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt); // Store the JWT for future requests
        console.log("Login successful");
      } else {
        setError(data.message || "Google login failed");
        console.error("Google login failed:", data.message);
      }
    } catch (error) {
      setError("Error during Google login: " + error.message);
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>
        <Image alt="Kindi" className="cursor-pointer" src={Google} />
      </button>
      {/* <button onClick={handleGoogleSignIn}>Sign up with Google</button> */}
      {error && <p>{error}</p>} {/* Display error if any */}
    </div>
  );
};

export default GoogleSignUp;
