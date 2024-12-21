"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove JWT token from localStorage or cookies
    localStorage.removeItem("jwt"); // Or use cookies depending on your storage method

    // Optional: Clear user-related data if needed
    sessionStorage.clear();

    // Redirect the user to the login page or home page
    router.push("/oAuth/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
