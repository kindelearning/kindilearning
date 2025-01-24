"use client";

import { signUpWithGoogle } from "@/app/firebase/auth";
import { BottomNavigation, Header } from "@/app/Sections";
import DynamicCard from "@/app/Sections/Global/DynamicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Google, WithApple } from "@/public/Images";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import GoogleSignUp from "../Sections/GoogleSignInButton";
import { GoogleLogin } from "@react-oauth/google";

export function GoogleSignUp() {
  const handleGoogleLogin = async (response) => {
    if (response?.credential) {
      const googleToken = response.credential;

      // Send the token to your Strapi backend for authentication
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/auth/google/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: googleToken,
          }),
        }
      );

      const data = await res.json();
      if (data?.jwt) {
        // Handle successful signup, save token, and log in the user
        console.log("Google signup successful:", data);
      } else {
        console.log("Error during Google signup:", data);
      }
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful!");
        setError("");
      } else {
        setError(data.error?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Laptop Screen */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-0 md:py-4 hidden lg:flex lg:flex-col  gap-[20px]">
        <div className="claracontainer h-screen md:h-full p-0 w-full bg-[#ffffff] rounded-[20px] flex flex-col md:flex-col lg:flex-row md:justify-between items-center justify-center overflow-hidden gap-8">
          {/* column 1 */}
          <div className="md:flex md:flex-col hidden gap-4 justify-center items-center px-4 w-full md:w-[50%]">
            <div className="text-[#0a1932] w-[50%] claraheading font-semibold flex flex-col justify-center items-center font-fredoka leading-10">
              Sign up
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full px-8 justify-center items-center gap-4"
            >
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
                {/* <button>
                  <Image alt="Kindi" className="cursor-pointer" src={Google} />
                </button> */}
                <GoogleSignUp />
              </div>
            </div>
            <div className="w-[max-content] justify-end items-start text-center">
              <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                Already have an account.{" "}
              </span>
              <Link
                href="/oAuth/signin"
                className="text-red text-sm font-medium font-fredoka leading-tight"
              >
                Login
              </Link>
            </div>
          </div>

          {/* column 2 */}
          <div className="flex w-[50%] p-0 h-full">
            {/* <GoogleSignUp /> */}
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
            onSubmit={handleSubmit}
            className="flex flex-col w-full justify-center items-center gap-4"
          >
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
            <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
              Or continue with
            </div>
            <div className="flex gap-2 items-center justify-center w-full">
              <Image alt="Kindi" className="cursor-pointer" src={WithApple} />
              {/* <button >
                <Image alt="Kindi" className="cursor-pointer" src={Google} />
              </button> */}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </section>
    </>
  );
}

// const handleGoogleSignUp = async () => {
//   try {
//     const user = await signUpWithGoogle();
//     setLoading(true); // Set loading to true when submitting starts
//     console.log("Google Sign-Up Successful:", user);
//     // Optional: Redirect user to dashboard or desired page
//     router.push("/profile"); // Redirect to activity page or any desired page
//   } catch (error) {
//     console.error("Google Sign-Up Failed:", error);
//     setLoading(false); // Set loading to true when submitting starts
//   }
// };
