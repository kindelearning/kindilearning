import { KindiHeart } from "@/public/Images";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const MyProfileRoutes = ({
  title = "My Activities",
  image,
  iconBackgroundColor = "#f05c5c",
}) => {
  return (
    <>
      <div className="w-full cursor-pointer px-4 py-3 bg-white rounded-[20px] justify-between items-center inline-flex">
        <div className="justify-start items-center w-full gap-[16px] flex">
          <div
            className="w-[42px] flex justify-center items-center h-[42px] rounded-[12px]"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            <Image alt="Kindi" src={image || KindiHeart} className="w-[24px] h-[28px]"/>
          </div>
          <div className="text-[#0a1932] text-[16px] md:text-[18px] lg:text-[20px] font-medium font-fredoka ">
            {title}
          </div>
        </div>
        <ChevronRight className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] text-[#0A1932]" />
      </div>
    </>
  );
};

export default MyProfileRoutes;
