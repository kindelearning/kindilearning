"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import firebaseApp from "@/app/firebase/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { Google } from "@/public/Images";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// const GoogleSignUp = () => {
//   const [error, setError] = useState("");

//   const handleGoogleSignIn = async () => {
//     const auth = getAuth(firebaseApp);
//     const provider = new GoogleAuthProvider();

//     try {
//       // Sign in with Google
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const idToken = await user.getIdToken();

//       // Send the token to your Strapi backend for verification
//       const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: idToken }),
//       });

//       const data = await response.json();

//       // Check if response is okay and process the JWT token
//       if (response.ok) {
//         localStorage.setItem("jwt", data.jwt); // Store the JWT for future requests
//         console.log("Login successful");
//       } else {
//         setError(data.message || "Google login failed");
//         console.error("Google login failed:", data.message);
//       }
//     } catch (error) {
//       setError("Error during Google login: " + error.message);
//       console.error("Error during Google login:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn}>
//         <Image alt="Kindi" className="cursor-pointer" src={Google} />
//       </button>
//       {/* <button onClick={handleGoogleSignIn}>Sign up with Google</button> */}
//       {error && <p>{error}</p>} {/* Display error if any */}
//     </div>
//   );
// };

// export default GoogleSignUp;

const GoogleSignUp = () => {
  const handleGoogleSignUp = async (response) => {
    const token = response.credential;

    // Send the token to the correct Strapi endpoint
    try {
      const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.jwt); // Store the JWT token
        console.log("Google Sign-in successful");
      } else {
        console.error("Google Sign-in failed");
      }
    } catch (error) {
      console.error("Error during Google Sign-in:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1055268493431-9l6ee7s7d7o14dfg5vhh9pr0jgq7rlh7.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleGoogleSignUp} onError={() => console.log("Login Failed")} />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignUp;
