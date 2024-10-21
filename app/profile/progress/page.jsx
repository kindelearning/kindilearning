import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import {
  KindiHeart,
  progressImage01,
  progressImage02,
  progressImage03,
} from "@/public/Images";
import Image from "next/image";
import React from "react";

const SubBagde = ({
  title = "title",
  number = "120",
  backgroundColor,
  borderColor,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-col lg:flex-row max-w-[240px] px-6 items-center gap-2  cursor-pointer  border-4 py-4 border-[${borderColor}] rounded-[12px] text-white`}
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    >
      <div className="text-center text-white text-[56px] font-semibold font-fredoka leading-[60px]">
        {number}
      </div>
      <span className="w-full font-medium text-center text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[18px] font-fredoka">
        {title}
      </span>
    </div>
  );
};

const SubProfileRoutes = ({
  title = "My Activities",
  image,
  iconBackgroundColor = "#f05c5c",
}) => {
  return (
    <div className="w-full min-w-[120px] lg:min-w-[180px] lg:min-h-[140px] h-full justify-between max-w-[180px] min-h-[120px] cursor-pointer p-4 bg-white rounded-[20px items-center inline-flex">
      <div className="justify-center items-center w-full gap-[24px] flex flex-col">
        <div
          className="w-[42px] flex justify-center items-center h-[42px] rounded-[12px]"
          style={{ backgroundColor: iconBackgroundColor }}
        >
          <Image alt="Kindi" src={image || KindiHeart} />
        </div>
        <div className="text-[#0a1932] text-center text-sm font-normal leading-tight font-fredoka">
          {title}
        </div>
      </div>
    </div>
  );
};

export default function Progress() {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer py-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="flex w-full px-4 h-[160px] flex-row justify-center gap-0 items-center relative">
            <Image
              alt="Kindi"
              src={progressImage01}
              className="cursor-pointer w-20 -mr-[32px] h-20"
            />
            <Image
              alt="Kindi"
              src={progressImage02}
              className="cursor-pointer w-30 z-10 h-30"
            />
            <Image
              alt="Kindi"
              src={progressImage03}
              className="cursor-pointer w-20 -ml-[32px] h-20"
            />
          </div>
          <div className="flex gap-2 px-4 overflow-x-scroll scrollbar-hidden w-full">
            <SubBagde
            number="12"
              title="Total Activities"
              backgroundColor="#019acf"
              borderColor="#a4d2ea"
            />
            <SubBagde
            number="23"
              title="Missed"
              backgroundColor="#f05c5c"
              borderColor="#ecc0c8"
            />
            <SubBagde
            number="34"
              title="Complete"
              backgroundColor="#029871"
              borderColor="#a5d2ce"
            />
          </div>
          <div className="flex w-full px-2 justify-center items-center gap-2 flex-wrap">
            <SubProfileRoutes
              iconBackgroundColor="#F05C5C"
              title="Emotional & Social Strength"
            />
            <SubProfileRoutes
              iconBackgroundColor="#3F3A64"
              title="Confidence & Independence"
            />
            <SubProfileRoutes
              iconBackgroundColor="#FF8E00"
              title="Speech & Language"
            />
            <SubProfileRoutes
              iconBackgroundColor="#FF8E00"
              title="Reading & Writing"
            />
            <SubProfileRoutes
              iconBackgroundColor="#019ACF"
              title="Physical Agility"
            />
            <SubProfileRoutes 
              iconBackgroundColor="#029871"
              title="Discovering our world"
            />
            <SubProfileRoutes
              iconBackgroundColor="#EEBA00"
              title="Creativity & Imagination"
            />
            <SubProfileRoutes
              iconBackgroundColor="#0A1932"
              title="Experiments & Math"
            />
          </div>
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
};

