"use client";

import { progressData } from "@/app/constant/menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileRoute() {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index
  // Function to go to the previous item
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? progressData.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === progressData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { id, icon, title, backgroundColor } = progressData[currentIndex]; // Get current data

  return (
    <div className="w-full lg:max-w-[340px] cursor-pointer px-4 py-3 gap-2 bg-white rounded-[12px] justify-between items-center inline-flex">
      <ChevronLeft
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handlePrevious}
      />
      <div className="flex w-[max-content] items-center gap-[12px]">
        <div
          className="w-[24px] flex justify-center items-center h-[24px] rounded-[4px]"
          style={{ backgroundColor: `#${backgroundColor}` }}
        >
          <Image alt={title} src={icon} className="w-[16px] h-[16px] p-[1px]" />
        </div>
        <div className="text-[#0a1932] w-[max-content] text-[14px] font-semibold font-fredoka leading-tight">
          {title || "Emotional & Social Strength"}
        </div>
      </div>
      <ChevronRight
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handleNext}
      />
    </div>
  );
}
