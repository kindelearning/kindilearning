"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Google, WithApple } from "@/public/Images";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Input } from "@/components/ui/input";
import { BottomNavigation, Header } from "@/app/Sections";
import { useState } from "react";
import { hygraphClient } from "@/lib/hygraph";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signUpWithEmail, signUpWithGoogle } from "@/app/firebase/auth";

// queries/createUser.js
export const CREATE_USER_MUTATION = `
  mutation CreateUser($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      const user = await signUpWithGoogle();
      setLoading(true); // Set loading to true when submitting starts
      console.log("Google Sign-Up Successful:", user);
      // Optional: Redirect user to dashboard or desired page
    } catch (error) {
      console.error("Google Sign-Up Failed:", error);
      setLoading(false); // Set loading to true when submitting starts
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await signUpWithEmail(email, password);

    if (response.success) {
      setLoading(true); // Set loading to true when submitting starts

      setMessage("User created successfully!");
      setError("");
    } else {
      setError(response.message);
      setMessage("");
      setLoading(false); // Set loading to true when submitting starts
    }
  };
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false); // New state for loading

  // const router = useRouter();

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Set loading to true when submitting starts

  //   try {
  //     const variables = { email, password };
  //     const { createAccount } = await hygraphClient.request(
  //       CREATE_USER_MUTATION,
  //       variables
  //     );

  //     if (createAccount) {
  //       // If signup is successful, redirect to login page or homepage
  //       router.push("/auth/sign-in"); // Redirect to signin after signup
  //     }
  //   } catch (error) {
  //     setLoading(false); // Set loading to false if there's an error

  //     console.error("GraphQL error:", error.response?.errors || error.message);
  //     setError("Signup failed. Try again.");
  //   }
  // };

  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden lg:flex lg:flex-col  gap-[20px]">
        <div className="claracontainer h-screen md:h-full p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-col lg:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Sign up
            </div>
            <form
              onSubmit={handleSignUp}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <input
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
                {loading ? "Registering..." : "Sign Up"}{" "}
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
            </form>

            <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
              <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
                Or continue with
              </div>
              <div className="flex gap-2 items-center justify-center w-full">
                <Image alt="Kindi" className="cursor-pointer" src={WithApple} />
                <button onClick={handleGoogleSignUp}>
                  <Image alt="Kindi" className="cursor-pointer" src={Google} />
                </button>
                <Image alt="Kindi" className="cursor-pointer" src={Facebook} />
              </div>
            </div>
            <div className="w-[max-content] justify-end items-start text-center">
              <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                Already have an account.{" "}
              </span>
              <Link
                href="/auth/sign-in"
                className="text-red text-sm font-medium font-fredoka leading-tight"
              >
                Login
              </Link>
            </div>
          </div>

          {/* column 2 */}
          <div className="flex w-[50%] p-0 h-full">
            <DynamicCard className="h-full" />
          </div>
        </div>
      </section>

      {/* Mobile Screen */}
      <section className="flex flex-col bg-[#f5f5f5] w-full overflow-y-hidden lg:hidden">
        <Header />
        <div className="flex claracontainer px-4 w-full flex-col h-[90vh] gap-6 py-12">
          <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
            Sign up
          </div>
          <form
            onSubmit={handleSignUp}
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
              {loading ? "Registering..." : "Sign Up"}{" "}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </form>
          <div className="w-[max-content] justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Already have an account.{" "}
            </span>
            <Link
              href="/auth/sign-in"
              className="text-red text-sm font-medium font-fredoka leading-tight"
            >
              Login
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}

// Larger Verification Screen
{
  /* <Dialog className="p-0 w-full rounded-[24px]">
  <DialogTrigger className="w-full p-0">
    <div className="flex w-full px-8">
      <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
        Sign Up
      </Button>
    </div>
  </DialogTrigger>
  <DialogContent className="w-full p-0 rounded-[24px] max-w-[1000px] flex items-center justify-center">
    <DialogHeader className="p-0">
     <DialogDescription className="flex flex-row  gap-0 h-[70vh] items-center justify-between w-full">
        <div className="w-full flex gap-8 flex-col justify-center items-center bg-[url('/Images/BGVectors.svg')] h-full min-w-[500px]">
          <div className="text-[#0a1932] text-[50px] font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
            Verify Your Email
          </div>
          <div className="w-full px-4 justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Please check your email Tom@example.com. We sent you the
              verification code.
            </span>{" "}
            <Link
              href="/auth/sign-in"
              className="text-red text-sm font-semibold font-fredoka leading-tight"
            >
              Resend
            </Link>
          </div>
          <div className="flex">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex w-full px-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                Submit
              </Button>
            </Link>
          </div>
        </div>
        <DynamicCard />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>; */
}

// Mobile OTP Screen
{
  /* <Dialog className="p-0 w-full rounded-[24px]">
  <DialogTrigger className="w-full p-0">
    <div className="flex w-full px-0 py-8">
      <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
        Create Account
      </Button>
    </div>
  </DialogTrigger>
  <DialogContent className="w-full p-0 rounded-[24px] flex items-center justify-center">
    <DialogHeader className="p-0">
      <DialogDescription className="flex flex-row  gap-0 h-[50vh] items-center justify-between w-full">
        <div className="w-full flex gap-8 flex-col justify-center items-center bg-[url('/Images/BGVectors.svg')] h-full">
          <div className="text-[#0a1932] text-[32px] font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
            Verify Your Email
          </div>
          <div className="w-full px-4 justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Please check your email Tom@example.com. We sent you the
              verification code.
            </span>{" "}
            <Link
              href="/auth/sign-in"
              className="text-red text-sm font-semibold font-fredoka leading-tight"
            >
              Resend
            </Link>
          </div>
          <div className="flex">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex w-full px-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                Submit
              </Button>
            </Link>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>; */
}
