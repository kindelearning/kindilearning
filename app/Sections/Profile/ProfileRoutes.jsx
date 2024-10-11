import { KindiHeart } from "@/public/Images";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileRoutes = ({
  title = "My Activities",
  image,
  // href = "#",
  iconBackgroundColor = "#f05c5c",
}) => {
  return (
    <>
      <div className="w-full cursor-pointer px-4 py-3 bg-white rounded-[20px] justify-between items-center inline-flex">
        <div className="justify-start items-center w-full gap-[24px] flex">
          <div
            className="w-[42px] flex justify-center items-center h-[42px] rounded-[12px]"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            <Image alt="kindi" src={image || KindiHeart} />
          </div>
          <div className="text-[#0a1932] text-xl font-semibold font-fredoka leading-tight">
            {title}
          </div>
        </div>
        <ChevronRight className="w-[42px] h-[42px] text-[#0a1932]" />
      </div>
    </>
  );
};

export default ProfileRoutes;
