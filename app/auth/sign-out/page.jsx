// Import the signOut function from next-auth/react
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/signin" }); // Redirect after sign-out
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
