"use client";

import Link from "next/link";
import { Facebook, Google, WithApple } from "@/public/Images";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Input } from "@/components/ui/input";
import { BottomNavigation, Header } from "@/app/Sections";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Sign In Response:", res); // Add this line for more insight

    if (res?.ok) {
      router.push("/p/activities");
    } else {
      setError("Invalid email or password.");
      console.log("Signin failed", res);
    }
  };

  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden md:flex md:flex-col  gap-[20px]">
        <div className="claracontainer p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 - The Animated Section */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Login
            </div>
            {error && <p>{error}</p>}
            <form
              onSubmit={handleSignin}
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
                className="clarabutton hover:bg-hoverRed w-full bg-red"
                type="submit"
              >
                Sign In
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
                Don't have an account.{" "}
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
      <section className="flex flex-col bg-[#f5f5f5] w-full overflow-y-hidden md:hidden">
        <Header />
        <div className="flex claracontainer px-4 w-full flex-col h-[90vh]  py-12">
          <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
            Login
          </div>
          {error && <p>{error}</p>}
          <form
            onSubmit={handleSignin}
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
              className="clarabutton hover:bg-hoverRed w-full bg-red"
              type="submit"
            >
              Sign In
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          </form>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}

{
  /* <Dialog className="p-0 w-full rounded-[24px]">
  <DialogTrigger className="w-full p-0">
    <div className="flex w-full px-0 py-8">
      <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
        Login
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

// laptop Verification
{
  /* <Dialog className="p-0 w-full rounded-[24px]">
  <DialogTrigger className="w-full p-0">
    <div className="flex w-full px-8">
      <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
        Login
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
