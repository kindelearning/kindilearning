"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const googleToken = urlParams.get("token"); // Assuming the token is sent as a URL parameter

      if (googleToken) {
        try {
          // Send the token to Strapi for validation and login
          const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: googleToken }),
          });

          const data = await res.json();

          if (res.ok) {
            // Store the JWT token in localStorage or cookies
            localStorage.setItem("jwt", data.jwt);
            // Redirect to the profile or dashboard page
            router.push("/profile");
          } else {
            console.error("Google authentication failed:", data.message);
          }
        } catch (error) {
          console.error("Error during Google login:", error);
        }
      }

      setLoading(false);
    };

    handleGoogleCallback();
  }, [router]);

  return <>{loading ? <p>Loading...</p> : null}</>;
}
