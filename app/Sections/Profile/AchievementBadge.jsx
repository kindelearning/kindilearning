import {
  HomeActive,
  LevelOne,
  LevelThree,
  LevelTwo,
  UserActive,
} from "@/public/Images";
import Image from "next/image";
import React from "react";

const badgeLevels = [
  {
    image: LevelOne,
    condition: (level) => level === 1,
  },
  {
    image: LevelTwo,
    condition: (level) => level === 2,
  },
  {
    image: LevelThree,
    condition: (level) => level >= 3,
  },
];

const AchievementBadge = ({
  image = HomeActive,
  backgroundColor = "#F04C64",
  title = "Five-day Stretch",
  level = 1, // Add level prop
}) => {
  const badgeLevel = badgeLevels.find((badge) => badge.condition(level)).image;

  return (
    <div className="flex flex-col justify-start items-start w-full gap-1">
      <div className="flex flex-col justify-center items-center w-full gap-0">
        <div
          className="flex w-[78px] lg:w-[100px] lg:h-[100px] h-[78px] justify-center items-center p-1 rounded-[24px]"
          style={{ backgroundColor }}
        >
          <div className="flex w-[76px] h-[70px] lg:w-[100px] lg:h-[94px] p-3 justify-center items-center border-2 border-white rounded-[20px]">
            <Image src={image || UserActive} alt="AchievementBadge" />
          </div>
        </div>
        <div className="flex w-full justify-end items-end ">
          <Image
            src={badgeLevel}
            alt="Kindi"
            className="-mt-[20px] lg:-mt-[22px] w-[24px] h-[24px] md:w-[32px] md:h-[32px] mr-0 lg:mr-[10px]"
          />
        </div>
      </div>
      <div className="w-full text-center text-sm text-[#000000] font-normal font-fredoka leading-tight">
        {title}
      </div>
    </div>
  );
};
export default AchievementBadge;
