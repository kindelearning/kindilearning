"use client";

import { NewsletterImg } from "@/public/Images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/subscribeTwo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("Something went wrong.");
    }
  };

  return (
    <section className="w-full z-10 h-auto bg-[#3F3D91] flex items-center justify-center flex-col gap-[20px] py-12">
      <div className="claracontainer px-0 md:px-2 lg:px-0 w-full flex flex-col md:flex-row md:justify-between justify-center items-center gap-4 md:gap-0 lg:gap-4">
        <Image
          alt="Kindi"
          src={NewsletterImg}
          className="-mt-[90px] w-[320px] z-10 max-h-[400px] md:max-h-[700px] md:h-[250px] md:w-[300px]  md:-mt-[80px] "
        />
        <div className="w-full flex flex-col gap-4 px-4 md:pr-0 lg:px-4">
          <div className="flex flex-col w-full gap-[12px]">
            <h2 className="text-white claraheading uppercase text-center md:text-start">
              SUBSCRIBE TO OUR <br />
              <span className="text-red uppercase">Newsletter </span>
              <span className="text-[#ffffff] uppercase">for offers</span>
            </h2>

            <p className="text-white text-center md:text-start clarabodyTwo">
              Plus *1st month free when you sign up for annual plan.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-2 items-center justify-start"
          >
            <div className="flex w-full flex-col md:flex-row gap-2 md:gap-0 items-center justify-center md:justify-start">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-l-[12px] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full md:rounded-r-[0px] ring-offset-0 focus:ring-0 border-0 w-full md:w-[300px]"
              />
              <Button
                type="submit"
                className="px-12 text-center rounded-full md:rounded-l-[0px] text-white hover:border-2 uppercase font-bold text-[16px] hover:border-[#ffffff8a] border-[#ffffff] hover:bg-[#3f3a64] md:px-8 xl:px-12 border-2 bg-red w-full md:w-auto"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {status && <p className="clarabodyTwo text-white">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
