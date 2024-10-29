"use client";

import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { getStoryData } from "@/lib/hygraph";
import { HeroBGOurStoryTwo } from "@/public/Images";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default async function Hero() {
  const { data: session, status } = useSession();

  const stories = await getStoryData();
  console.log("Story Page Data (in component):", stories);
  if (!stories || !stories[0]?.theKindiMission) {
    console.error("Error: Stories data is missing or incomplete.");
    return <NotFound />;
  }

  return (
    <section className="max-w-[1500px] flex justify-center bg-[#ffffff] w-full items-center">
      <div className="w-full min-h-screen lg:h-[814px] object-bottom bg-none lg:bg-hero-image bg-contain bottom-0 bg-center bg-no-repeat justify-self-end grid md:flex md:flex-col lg:grid-cols-2 pb-16 gap-6 animate-fadeIn">
        <div className="w-full h-full flex flex-col lg:hidden p-0 justify-start items-start animate-slideInUp">
          <Image
            alt="Kindi"
            src={HeroBGOurStoryTwo}
            className="object-cover w-full"
          />
        </div>

        <div className="claracontainer w-full px-4 lg:pr-4 lg:pl-[92px] lg:max-w-[56%] flex flex-col body md:justify-between min-h-fit lg:justify-between xl:justify-between justify-center items-start  lg:py-24 animate-slideInUp">
          <div className="w-full py-0 md:py-2 flex-col flex justify-start items-start script animate-fadeIn animate-delay-500">
            <div className="w-full text-red clarascript animate-slideInLeft script animate-delay-1000">
              Maximising Potential for a Lifetime of Achievement
            </div>
            <div className="flex flex-col w-full justify-start items-start heading animate-fadeIn animate-delay-1500">
              <div className="text-start flex-wrap w-full animate-slideInLeft animate-delay-2000">
                <span className="text-[#3f3a64] claraheading">The Kindi </span>{" "}
                <span className="text-red claraheading">Mission</span>
              </div>
              <div className="w-full text-start justify-start items-start px-0 animate-fadeIn animate-delay-2500">
                <div className="w-full text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000">
                  <p>{stories[0].theKindiMission}</p>
                  <br />
                  <span className="italic">
                    “The first five years have so much to do with how the next
                    80 turn out.”
                  </span>
                  <br />
                  <span className="font-semibold">
                    — Bill Gates American businessman, investor, philanthropist.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto animate-slideInUp animate-delay-4000">
            <Button className="bg-red hover:bg-hoverRed clarabutton px-6 md:px-12 py-3 rounded-[16px] animate-fadeIn animate-delay-4500">
              {/* Get Started */}
              {session ? "Upgrade" : "Get Started"}
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex w-[40%]"></div>
      </div>
    </section>
  );
}
