"use client";

import Link from "next/link";
import { Facebook, Google, WithApple } from "@/public/Images";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Input } from "@/components/ui/input";
import { BottomNavigation, Header } from "@/app/Sections";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginWithEmail, signUpWithGoogle } from "@/app/firebase/auth";

export default function Signin() {
  const [loading, setLoading] = useState(false); // New state for loading
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
    setError(""); // Reset any previous errors

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    try {
      const response = await loginWithEmail(emailTrimmed, passwordTrimmed);
      if (response.success) {
        router.push("/p"); // Redirect to activity page or any desired page
      } else {
        setError(response.message); // Display error message to user
      }
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      setError("An error occurred during login.");
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const router = useRouter();

  // const handleSignin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Set loading to true when submitting starts

  //   const res = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });

  //   console.log("Sign In Response:", res);
  //   if (res?.ok) {
  //     setLoading(false); // Set loading to false if there's an error
  //     router.push("/p/activities");
  //   } else {
  //     setError("Invalid email or password.");
  //     setLoading(false); // Set loading to false if there's an error
  //     console.log("Signin failed", res);
  //   }
  // };

  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden lg:flex lg:flex-col  gap-[20px]">
        <div className="claracontainer h-screen md:h-full p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-col lg:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 - The Animated Section */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Login
            </div>
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <Button
                disabled={loading}
                className="clarabutton hover:bg-hoverRed w-full bg-red"
                type="submit"
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
              <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
                Or continue with
              </div>
              <div className="flex gap-2 items-center justify-center w-full">
                <Image alt="Kindi" className="cursor-pointer" src={WithApple} />
                <Image alt="Kindi" className="cursor-pointer" src={Google} />
                <Image alt="Kindi" className="cursor-pointer" src={Facebook} />
              </div>
            </div>
            <div className="w-[max-content] justify-end items-start text-center">
              <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                Don&apos;t have an account.{" "}
              </span>
              <Link
                href="/auth/sign-up"
                className="text-red text-sm font-medium font-fredoka leading-tight"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* column 2  - The Animated Section*/}
          <div className="flex w-full md:w-[50%] p-0 h-full">
            <DynamicCard className="h-full" />
          </div>
        </div>
      </section>

      {/* Mobile Screen */}
      <section className="flex flex-col bg-[#f5f5f5] w-full overflow-y-hidden lg:hidden">
        <Header />
        <div className="flex claracontainer px-4 w-full flex-col h-[90vh] gap-6 py-12">
          <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
            Login
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full justify-center items-center gap-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <Button
              disabled={loading}
              className="clarabutton hover:bg-hoverRed w-full bg-red"
              type="submit"
            >
              {loading ? "Signing In..." : "Sign In"}{" "}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <div className="w-[max-content] justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Don&apos;t have an account.{" "}
            </span>
            <Link
              href="/auth/sign-up"
              className="text-red text-sm font-medium font-fredoka leading-tight"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}
