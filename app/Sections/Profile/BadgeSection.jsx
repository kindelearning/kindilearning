import { Milestone } from "@/public/Images";
import Image from "next/image";
import React from "react";

const BadgeSection = ({
  backgroundColor = "#f05c5c",
  icon = Milestone,
  borderColor = "#ffffff",
  title = "Milestone",
}) => {
  return (
    <>
      <div
        className={`flex w-full md:w-[160px] lg:w-[230px] flex-col md:flex-col lg:flex-row justify-start items-center gap-2 border-4 py-4 px-4 rounded-[12px] text-white`}
        style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
      >
        <Image
          src={icon}
          alt="Badge Icon"
          className="md:w-[64px] md:h-[64px] w-[36px] h-[36px]"
        />
        <span className="w-full font-medium text-center text-white text-[20px] font-fredoka leading-[28px]">
          {title}
        </span>
      </div>
    </>
  );
};

export default BadgeSection;
