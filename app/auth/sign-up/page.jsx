"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Google, WithApple } from "@/public/Images";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Input } from "@/components/ui/input";
import { BottomNavigation, Header } from "@/app/Sections";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setError("Failed to sign up");
    } else {
      setError("");
      window.location.href = "/auth/sign-in";
    }
  };
  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden md:flex md:flex-col  gap-[20px]">
        <div className="claracontainer h-screen md:h-full p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-col lg:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Sign up
            </div>
            {/* <div className="flex flex-col w-full px-8 justify-center items-center gap-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </div> */}
            {error && <p>{error}</p>}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button type="submit">Sign Up</button>
            </form>
            <Dialog className="p-0 w-full rounded-[24px]">
              {/* OTP verification Trigger */}
              <DialogTrigger className="w-full p-0">
                <div className="flex w-full px-8">
                  <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                    Sign Up
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full p-0 rounded-[24px] max-w-[1000px] flex items-center justify-center">
                <DialogHeader className="p-0">
                  {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                  <DialogDescription className="flex flex-row  gap-0 h-[70vh] items-center justify-between w-full">
                    {/* Coloumn 1 */}
                    <div className="w-full flex gap-8 flex-col justify-center items-center bg-[url('/Images/BGVectors.svg')] h-full min-w-[500px]">
                      <div className="text-[#0a1932] text-[50px] font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
                        Verify Your Email
                      </div>
                      <div className="w-full px-4 justify-end items-start text-center">
                        <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                          Please check your email Tom@example.com. We sent you
                          the verification code.
                        </span>{" "}
                        <Link
                          href="/auth/sign-in"
                          className="text-red text-sm font-semibold font-fredoka leading-tight"
                        >
                          Resend
                        </Link>
                      </div>
                      <div className="flex">
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        >
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
                    {/* Coloumn 2 */}
                    <DynamicCard />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

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
      <section className="flex flex-col bg-[#f5f5f5] w-full overflow-y-hidden md:hidden">
        <Header />
        <div className="flex claracontainer px-4 w-full flex-col h-[90vh] gap-6 py-12">
          <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
            Sign up
          </div>
          {/* <div className="flex flex-col w-full justify-center items-center gap-4">
            <Input type="text" placeholder="Enter your Name" />
            <Input type="email" placeholder="Enter your Email" />
            <Input type="password" placeholder=" Enter your Password" />
            <Input type="password" placeholder=" Confirm your Password" />
          </div> */}
          {error && <p>{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full justify-center items-center gap-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </form>
          <Dialog className="p-0 w-full rounded-[24px]">
            {/* OTP verification Trigger */}
            <DialogTrigger className="w-full p-0">
              <div className="flex w-full px-0 py-8">
                <Button className="w-full bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                  Create Account
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-full p-0 rounded-[24px] flex items-center justify-center">
              <DialogHeader className="p-0">
                {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                <DialogDescription className="flex flex-row  gap-0 h-[50vh] items-center justify-between w-full">
                  {/* Coloumn 1 */}
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
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
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
          </Dialog>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}
