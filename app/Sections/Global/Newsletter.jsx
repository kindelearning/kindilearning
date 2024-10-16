"use client";

import { NewsletterImg } from "@/public/Images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const res = await fetch("/api/subscribeTwo", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
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
            onSubmit={subscribe}
            className="flex w-full flex-col md:flex-row gap-2 md:gap-0 items-center justify-center md:justify-start"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your email"
              required
              className="rounded-l-[12px] rounded-full md:rounded-r-[0px] ring-offset-0 focus:ring-0 border-0 w-full md:w-[300px]"
            />
            <Button
              type="submit"
              className="px-12 text-center rounded-full md:rounded-l-[0px] text-white hover:border-2 uppercase font-bold text-[16px] hover:border-[#ffffff8a] border-[#ffffff] hover:bg-[#3f3a64] md:px-8 xl:px-12 border-2 bg-red w-full md:w-auto"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
            {status === "success" && (
              <p className="text-white clarabodyTwo">
                Thank you for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="text-red clarabodyTwo">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
