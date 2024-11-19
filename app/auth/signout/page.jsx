"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
  };

  return (
    <>
      <div className="claracontainer h-full">
        <button
          className="clarabutton text-white py-2 bg-red hover:bg-hoverRed"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default SignOutButton;
