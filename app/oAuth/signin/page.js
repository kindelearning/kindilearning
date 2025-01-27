"use client";

import app from "@/app/firebase/firebaseConfig";
import { BottomNavigation, Header } from "@/app/Sections";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Google, WithApple } from "@/public/Images";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const auth = getAuth(app); // Use the initialized app here

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        console.log("JWT Token:", data.jwt);

        // Save the token to localStorage
        localStorage.setItem("jwt", data.jwt);

        // Optionally redirect to the profile page or another page
        // window.open("/profile", "_blank");
      } else {
        setMessage(data.error.message || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // User information from Google
      const user = result.user;
      console.log("Logged in user:", user);

      // You can now use user data (e.g., user.displayName, user.email) as needed

      // Redirect or handle the login success here, e.g., storing user data in state
      window.open("/profile", "_blank");
    } catch (err) {
      setError(err.message);
      console.error("Google login error:", err);
    }
  };
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
              onSubmit={handleSubmit}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <Input
                type="text"
                name="identifier"
                placeholder="Email or Username"
                value={formData.identifier}
                onChange={handleChange}
                required
              />

              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <Button
                disabled={loading}
                className="clarabutton hover:bg-hoverRed w-full bg-red"
                type="submit"
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
              </Button>
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
              <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
                Or continue with
              </div>
              <div className="flex gap-2 items-center justify-center w-full">
                <Image alt="Kindi" className="cursor-pointer" src={WithApple} />
                <button onClick={handleGoogleLogin}>
                  <Image alt="Kindi" className="cursor-pointer" src={Google} />
                </button>{" "}
                <br />
                {error && <p>{error}</p>}
              </div>
            </div>
            <div className="w-[max-content] justify-end items-start text-center">
              <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                Don&apos;t have an account.{" "}
              </span>
              <Link
                href="/oAuth/signup"
                className="text-red text-sm font-medium font-fredoka leading-tight"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* column 2  - The Animated Section*/}
          <div className="flex w-full md:w-[50%] p-0 h-full">
            {/* <DynamicCard className="h-full" /> */}
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
            onSubmit={handleSubmit}
            className="flex flex-col w-full justify-center items-center gap-4"
          >
            <Input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={formData.identifier}
              onChange={handleChange}
              required
            />

            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                requiredthe
                toggle
                icon
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <Button
              disabled={loading}
              className="clarabutton hover:bg-hoverRed w-full bg-red"
              type="submit"
            >
              {loading ? "Signing In..." : "Sign In"}{" "}
            </Button>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <div className="w-[max-content] justify-end items-start text-center">
            <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Don&apos;t have an account.{" "}
            </span>
            <Link
              href="/oAuth/signup"
              className="text-red text-sm font-medium font-fredoka leading-tight"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
            <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
              Or continue with
            </div>
            <div className="flex gap-2 items-center justify-center w-full">
              <Image alt="Kindi" className="cursor-pointer" src={WithApple} />
              <button onClick={handleGoogleLogin}>
                <Image alt="Kindi" className="cursor-pointer" src={Google} />
              </button>{" "}
              <br />
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {/* <Image alt="Kindi" className="cursor-pointer" src={Facebook} /> */}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}
