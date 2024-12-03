"use client";

import NotFound from "@/app/not-found";
import { getHIWData } from "@/lib/hygraph";
import {
  AgeCardFour,
  AgeCardOne,
  AgeCardThree,
  AgeCardTwo,
  AgeRangeArrow,
  User,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const AgeCard = ({ bgImage, image, title, body, link }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full min-h-[390px] h-[390px] border-t-2 border-b-2 min-w-[280px]  flex flex-col bg-[#ffffff00] rounded-[24px] justify-between items-start px-8 py-4"
      >
        <div className="flex w-full items-center justify-start flex-col">
          <Image
            alt="Kindi"
            src={image || User}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
          <h2 className="text-[#0a1932] w-full text-[18px] font-semibold font-fredoka text-start leading-[20px] mt-4">
            {title || "title"}
          </h2>
          <p className="text-[#0a1932] w-full text-[16px] font-medium font-fredoka leading-[20px] text-start mt-2">
            {body || "Description"}
          </p>
        </div>
        <Link
          href={link || "/p/community"}
          className="w-full justify-start items-start"
        >
          <div className="w-full bg-[#ada5a500] border-[#ffffff00] text-center text-red hover:underline hover:bg-[#f05c5c00] clarabutton mt-8">
            Read More
          </div>
        </Link>
      </div>
    </>
  );
};

const AgeRangeWidget = () => {
  const scrollRef = useRef(null); // Create a reference for the scroll container

  // Function to handle scroll
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Amount to scroll on each click
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  // Mouse dragging state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full lg:max-w-[1180px] px-4 min-h-[400px] py-6 flex justify-center items-center">
      {/* Left Arrow Button */}
      <button
        className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0  transform -translate-y-1/2 bg-[#6f6f6f] bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
        onClick={() => handleScroll("left")}
        aria-label="Scroll Left"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
       ref={scrollRef}
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}
       onMouseLeave={handleMouseUp}
       style={{ cursor: isDragging ? "grabbing" : "grab" }}
        className="w-full flex-row justify-start items-center gap-[2px] flex overflow-x-auto scrollbar-hidden"
        // style={{
        //   scrollBehavior: "smooth", // Enable smooth scroll
        // }}
      >
        <AgeCard
          image={AgeCardOne}
          bgImage="/Images/AgeRangeOne.svg"
          title="Beginners (0+ YEARS)"
          body="Sensory play activities tailored for very young little ones, but appeal to all young children."
        />
        <Image
          src={AgeRangeArrow}
          alt="Kindi"
          className="w-[50px] h-[50px] -mx-3"
        />
        <AgeCard
          image={AgeCardTwo}
          bgImage="/Images/AgeRangeTwo.svg"
          body="Our learning activities help toddlers develop essential language, social, motor and cognitive skills — but babies and pre-schoolers can enjoy the fun, too!"
          title="Explorers (18+ MONTHS)"
        />
        <Image
          src={AgeRangeArrow}
          alt="Kindi"
          className="w-[50px] h-[50px] -mx-3"
        />
        <AgeCard
          image={AgeCardThree}
          bgImage="/Images/AgeRangeThree.svg"
          body="Fun learning activities for children approaching the beginning of their school careers; these activities will also appeal to toddlers and babies."
          title="Discoverers (2.5+ YEARS)"
        />
        <Image
          src={AgeRangeArrow}
          alt="Kindi"
          className="w-[50px] h-[50px] -mx-3"
        />
        <AgeCard
          image={AgeCardFour}
          bgImage="/Images/AgeRangeFour.svg"
          title="Adventurers (4+ YEARS)"
          body="Fun and engaging early years development activities for kindergarteners — Tailored developmental stages for toddlers, babies and pre-schoolers alike."
        />
      </div>

      {/* Right Arrow Button */}
      <button
        // className="absolute right-0 z-10 bg-gray-500 bg-opacity-30 rounded-full p-2"
        className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 transform -translate-y-1/2 bg-[#6f6f6f] bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
        onClick={() => handleScroll("right")}
        aria-label="Scroll Right"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

const AgeRanges = async () => {
  const stories = await getHIWData();
  // console.log("Story Page Data (in component):", stories);
  if (!stories || !stories[0]?.ageRanges) {
    console.error("Error: Stories data is missing or incomplete.");
    return <NotFound />;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 justify-start items-center lg:justify-center w-full flex flex-col overflow-hidden gap-8">
          {/* Top Heading Section */}
          <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
            <div className="text-start w-full md:text-center">
              <div>
                <span className="text-[#3f3a64] claraheading">
                  Flexible & Focused
                </span>
                <span className="text-red claraheading"> Age Ranges</span>
              </div>
            </div>
            <div className="flex w-full justify-start items-start flex-col">
              <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
                <p>{stories[0].ageRanges}</p>
              </div>
            </div>
          </div>
          {/* Row Two */}
          <AgeRangeWidget />
        </div>
      </section>
    </>
  );
};

export default AgeRanges;
