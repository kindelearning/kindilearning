"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Assuming you're using Next.js for routing
import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      localStorage.removeItem("jwt");
      await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Send the JWT in the request headers if necessary
          },
        }
      );

      // Redirect user to login page or homepage
      router.push("/oAuth/signin"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full justify-start items-center flex">
      <Button
        onClick={handleLogout}
        disabled={loading}
        className="clarabutton max-w-[300px] bg-red hover:bg-hoverRed"
      >
        {loading ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
}
