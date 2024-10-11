"use client";

import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

const sections = [
  { title: "Learning Objective", description: "" },
  { title: "What you need?", description: "" },
  { title: "Main Activity", description: "" },
  { title: "Different ways to play", description: "" },
  { title: "Expended Learning", description: "" },
];

const generateDescription = () => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const Accordian = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-1 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#3f3a64] text-[16px] py-2 md:py-[10px] font-[550] font-fredoka">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300`}
        >
          <ChevronRight />
        </span>
      </div>
      {isOpen && (
        <div className="pb-4">
          <p className="text-base font-medium text-[#0A1932]">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Accordian;
