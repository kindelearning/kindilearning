"use client";

import {
  KindiVector,
  Logo,
  PromotionalImage,
  SlideGrow,
  SlideLearn,
  SlideMain,
  SlidePlay,
  SlideThrive,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

const DynamicCardMobile = () => {
  const slides = useMemo(
    () => [
      {
        image: SlideThrive,
        title: "Thrive",
        description:
          "Increase the likelihood of achievement in higher education and the success and happiness of children in their later lives.",
        backgroundColor: "#C42797",
      },
      {
        image: SlideLearn,
        title: "Learn",
        description:
          "Each learning activity has several learning outcomes depending on age & stage. Carers are guided to target different learning outcomes for each child.",
        backgroundColor: "#F05C5C",
      },
      {
        image: SlideGrow,
        title: "Grow",
        description:
          "Stay informed about your child’s development compared to the national average and track each child’s progress with our ‘Milestone Tracker’. This assists adults in recognizing and supporting areas where children excel or may need additional guidance.",
        backgroundColor: "#019ACF",
      },
      {
        image: SlideMain,
        title: "Brain Development Activities for 0 - 5 Year Old Kids",
        description:
          "The play-based approach to early learning that makes early years development easier and more joyful than ever.",
        backgroundColor: "#3F3D91",
      },
      {
        image: PromotionalImage,
        title: "Childhood Development Unlocked",
        description:
          "By age five, our brains are already 90% developed, influencing essential lifelong skills, abilities, and positive habits. However, creating crucial brain connections becomes more challenging as we age.",
        backgroundColor: "#029871",
      },
      {
        image: SlidePlay,
        title: "Play",
        description:
          "At Kindi, we provide adults with the necessary tools to teach toddlers effectively, maximizing each day of early brain growth through guided play activities, ensuring that children stay on track with their development.",
        backgroundColor: "#FFAA00",
      },
    ],
    [] // Empty dependency array means it only runs once
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]); // Depend on slides.length instead of slides

  return (
    <>
      <div
        style={{
          backgroundColor: slides[currentSlide].backgroundColor,
        }}
        className="w-screen h-screen md:min-h-[90vh] md:h-full flex flex-col justify-center items-center"
      >
        <Link
          href="/"
          className="w-full claracontainer bg-transparent py-4 flex flex-row justify-between items-center"
        >
          <Image src={KindiVector} className="w-[100px] " alt="KindiDark" />
        </Link>
        <div
          className="flex-col gap-4 p-4 w-full h-full rounded-[16px] flex justify-center items-center"
          style={{
            backgroundColor: slides[currentSlide].backgroundColor,
          }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className={`w-full md:w-[400px] h-fit object-cover transition duration-1000`}
          />
          <div className="w-full justify-center items-center flex flex-col gap-2 md:gap-4 transition duration-1000">
            <h2 className="text-white claraheading md:text-[44px] md:leading-[48px] font-semibold font-fredoka text-center transition duration-3000">
              {slides[currentSlide].title}
            </h2>
            <p className="w-full text-center text-white clarabodyTwo md:text-[28px] md:leading-[32px] transition duration-3000">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicCardMobile;
