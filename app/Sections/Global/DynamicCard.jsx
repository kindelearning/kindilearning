"use client";

import {
  PromotionalImage,
  SlideGrow,
  SlideLearn,
  SlideMain,
  SlidePlay,
  SlideThrive,
} from "@/public/Images";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";

const DynamicCard = () => {
  // Use useMemo to memoize the slides array
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
    <div
      style={{
        backgroundColor: slides[currentSlide].backgroundColor,
      }}
      className="h-full transition duration-3000 rounded-r-[20px]"
    >
      <div
        className="w-full py-24 h-full flex-col gap-8 rounded-r-[16px] px-4 flex justify-center items-center min-w-[500px] transition duration-1000"
        style={{
          backgroundColor: slides[currentSlide].backgroundColor,
        }}
      >
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title} // Added alt attribute
          className={`w-[320px] transition duration-1000 ${
            currentSlide === slides.length - 1 ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className="w-full justify-center items-center flex flex-col gap-2 transition duration-1000"
          style={{
            opacity: currentSlide === slides.length - 1 ? 0 : 1,
          }}
        >
          <div
            className="text-white text-clip text-[32px] leading-[36px] font-semibold font-fredoka text-center transition duration-3000"
            style={{
              opacity: currentSlide === slides.length - 1 ? 0 : 1,
            }}
          >
            {slides[currentSlide].title}
          </div>
          <div
            className="w-full text-center text-white clarabodyTwo transition duration-3000"
            style={{
              opacity: currentSlide === slides.length - 1 ? 0 : 1,
            }}
          >
            {slides[currentSlide].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
