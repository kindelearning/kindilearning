"use client";

import { cardData } from "@/app/constant/menu";
import NotFound from "@/app/not-found";
import { MyToggleCard } from "@/app/Widgets";
import { getHIWData } from "@/lib/hygraph";
import React, { useState } from "react";

const AreasOfLearning = async () => {
  const [isOpen, setIsOpen] = useState(false);
  const stories = await getHIWData();
  console.log("Story Page Data (in component):", stories);
  if (!stories || !stories[0]?.areasOfLearning) {
    console.error("Error: Stories data is missing or incomplete.");
    return <NotFound />;
  }

  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center pt-4 pb-12 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-4 w-full flex flex-col overflow-hidden gap-8">
        {/* Top Heading Section */}
        <div className="claracontainer p-4 w-full py-4 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-start w-full md:text-center">
            <span className="text-[#3f3a64] claraheading">Kindi’s </span>
            <span className="text-red claraheading">areas of learning</span>
          </div>
          <div className="flex w-full justify-start items-start flex-col">
            <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#3f3a64] font-fredoka text-[18px] font-medium leading-[22px]">
              {/* Unlocking your child&apos;s full potential. Kindi is here to
              equip you with the tools to make it happen! Discover our early
              years education activities across eight distinctive categories,
              all aligned with UK education curriculums. */}
              <p>{stories[0].areasOfLearning}</p>
            </div>
          </div>
        </div>

        <div className="claracontainer px-4 md:pl-0  flex flex-row overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 gap-4 justify-between">
          {cardData.map((card, index) => (
            <MyToggleCard
              key={index}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={card.title}
              description={card.description}
              backgroundColor={card.backgroundColor}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasOfLearning;
