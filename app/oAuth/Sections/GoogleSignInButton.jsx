"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setLoading(true);
    // Redirect the user to the Strapi Google OAuth2 login route
    window.location.href = "http://localhost:1337/api/connect/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center justify-center bg-blue-500 text-white p-2 rounded"
    >
      {loading ? "Logging in..." : <span>Sign In with Google</span>}
      <Image
        src="/path-to-google-logo.png"
        alt="Google"
        width={20}
        height={20}
      />
    </button>
  );
}
