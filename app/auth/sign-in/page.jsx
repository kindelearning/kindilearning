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

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting starts

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Sign In Response:", res);
    if (res?.ok) {
      setLoading(false); // Set loading to false if there's an error
      router.push("/p/activities");
    } else {
      setError("Invalid email or password.");
      setLoading(false); // Set loading to false if there's an error
      console.log("Signin failed", res);
    }
  };

  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden lg:flex lg:flex-col  gap-[20px]">
        <div className="claracontainer p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:hidden lg:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 - The Animated Section */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Login
            </div>
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
