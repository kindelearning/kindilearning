"use client";

import { cardData } from "@/app/constant/menu";
import NotFound from "@/app/not-found";
import { MyToggleCard } from "@/app/Widgets";
// import { MyToggleCard } from "@/app/Widgets";
import { getHIWData } from "@/lib/hygraph";
import { KindiHeart } from "@/public/Images";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ToggleCard = ({
  title,
  description,
  icon,
  backgroundColor,
  isOpen,
  setIsOpen,
  link = "#",
  linkText = "Read More",
}) => {
  return (
    <div
      className={`w-full min-w-[320px] md:min-w-[200px] max-w-md p-4 rounded-[16px] shadow-md`}
      style={{ backgroundColor: `#${backgroundColor}` }}
    >
      <div className="flex justify-between h-full flex-col items-center">
        <div className="flex w-full h-full justify-between flex-col items-center">
          <div className="flex w-full flex-row justify-between min-h-[50px] items-start">
            <h5 className="text-white font-bold text-[24px] font-fredoka leading-[28px]">
              {title}
            </h5>
            <Image
              alt="Kindi"
              src={icon || KindiHeart}
              className="flex justify-center w-[40px] h-[40px]"
            />
          </div>
          <div
            className={`my-4 h-full justify-between flex flex-col gap-2 w-full px-4 transition-all duration-1000 overflow-hidden ${
              isOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <p className="text-white text-base font-medium font-montserrat leading-[20px]">
              {description}
            </p>
            <a
              href={link}
              className="text-center text-white text-lg font-bold font-fredoka uppercase leading-relaxed mt-2 relative inline-block"
            >
              <span className="transition-all duration-300">{linkText}</span>
              <span className="absolute bottom-0 left-0 w-0 bg-white h-[2px] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black rounded-full p-[2px] items-end"
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-[white]" />
          ) : (
            <Plus className="w-4 h-4 text-[white]" />
          )}
        </button>
      </div>
    </div>
  );
};

const ToggleCardGrid = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Manage the open states of each card
  // const [openStates, setOpenStates] = useState(Array(8).fill(false));
  // // Toggle a specific card's open state
  // const handleToggle = (index) => {
  //   const newStates = [...openStates];
  //   newStates[index] = !newStates[index];
  //   setOpenStates(newStates);
  // };

  // Function to toggle the shared state
  const handleCardClick = () => {
    setIsOpen((prev) => !prev); // Toggle the state
  };

  return (
    <div className="claracontainer px-4 md:pl-0  flex flex-row overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 gap-4 justify-between">
      {cardData.map((card, index) => (
        <MyToggleCard
          key={index}
          title={card.title}
          description={card.description}
          backgroundColor={card.backgroundColor}
          isOpen={isOpen}
          setIsOpen={handleCardClick}
          color={card.color || "white"}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

const AreasOfLearning = async () => {
  const [isOpen, setIsOpen] = useState(false);
  const stories = await getHIWData();
  // console.log("Story Page Data (in component):", stories);
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
              <p>{stories[0].areasOfLearning}</p>
            </div>
          </div>
        </div>

      
        <ToggleCardGrid />
      </div>
    </section>
  );
};

export default AreasOfLearning;
