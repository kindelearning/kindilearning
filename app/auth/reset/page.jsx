"use client";

import Link from "next/link";
import { Facebook, Google, WithApple } from "@/public/Images";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Input } from "@/components/ui/input";
import { BottomNavigation, Header } from "@/app/Sections";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function ResetPassword({ oobCode }) {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password has been reset successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
      console.error("Error resetting password:", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden md:flex md:flex-col  gap-[20px]">
        <div className="claracontainer p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 - The Animated Section */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full">
            <div className="text-[#0a1932] clarabodyTwo text-center ">
              Reset your Password
            </div>
            <form
              onSubmit={handleResetPassword}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter New Password"
              />
              <Button
                disabled={loading}
                className="clarabutton hover:bg-hoverRed w-full bg-red"
                type="submit"
              >
                {loading ? "Submitting Request..." : "Reset Password"}{" "}
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
            </form>
            <div className="w-[max-content] justify-end items-start text-center">
              <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                Try Login.{" "}
              </span>
              <Link
                href="/auth/sign-in"
                target="_blank"
                className="text-red text-sm font-medium font-fredoka leading-tight"
              >
                Reset
              </Link>
            </div>

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
      <section className="flex flex-col bg-[#f5f5f5] w-full overflow-y-hidden md:hidden">
        <Header />
        <div className="flex claracontainer px-4 w-full flex-col h-[90vh] py-12">
          <div className="text-[#0a1932] clarabodyTwo font-semibold font-fredoka leading-loose">
            Reset your Password
          </div>
          <form
            onSubmit={handleResetPassword}
            className="flex flex-col w-full justify-center items-center gap-4"
          >
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter New Password"
            />
            <Button
              disabled={loading}
              className="clarabutton hover:bg-hoverRed w-full bg-red"
              type="submit"
            >
              {loading ? "Submitting Request..." : "Reset Password"}{" "}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </form>
          <div className="w-[max-content] justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Try Login.{" "}
            </span>
            <Link
              href="/auth/sign-in"
              target="_blank"
              className="text-red text-sm font-medium font-fredoka leading-tight"
            >
              Reset
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}
