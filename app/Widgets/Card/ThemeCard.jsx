import { ThemeDummy } from "@/public/Images";
import Image from "next/image";
import React from "react";
import ThemeTimer from "../Chip/ThemeTimer";

const ThemeCard = () => {
  return (
    <div
      className={`flex flex-col gap-[-12px] justify-center items-end animate-fade-in transition-all duration-300  cursor-pointer group`}
    >
      <div
        className={`p-[8px] w-full bg-[#3f3d91] min-w-[360px] flex flex-col items-end rounded-[32px] animate-slide-up `}
      >
        <div
          className={`w-full flex max-h-[200px] lg:min-h-[200px]  justify-between border-2 border-white  rounded-[28px] `}
        >
          <div
            className={`w-full max-w-[200px] flex flex-col bg-[#3f3d91] lg:max-w-[460px] z-2 rounded-r-[100px] rounded-l-[50px] lg:rounded-l-[38px] py-4 lg:py-8 justify-start items-start pl-4 pr-2 animate-fade-in`}
          >
            <div className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[36px] xl:text-[36px] xl:leading-[40px]">
              Winter Magic
            </div>
            <div className="text-white text-[14px] leading-[18px] max-w-[350px] md:text-[16px] md:leading-[20px] lg:text-[20px] lg:leading-[24px] xl:text-[22px] xl:leading-[26px] font-medium font-montserrat">
              Snowy adventures, ice castles, cozy indoor playtimes.
            </div>
          </div>
          <div className="flex overflow-clip -z-20 -ml-[96px] group-hover:scale-[1.025] transition-all duration-300">
            <Image
              alt="Kindi"
              src={ThemeDummy}
              className={`w-full max-w-[130px] md:max-w-[200px] lg:max-w-[240px]  h-full object-cover rounded-r-[28px] animate-fade-in`}
            />
          </div>
        </div>
      </div>
      <div className="-mt-4 flex mr-2 z-12 animate-fade-in">
        <ThemeTimer />
      </div>
    </div>
  );
};

export default ThemeCard;
