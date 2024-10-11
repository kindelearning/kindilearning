"use client";

import { KindiHeart } from "@/public/Images";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ToggleCard = ({
  title = "Emotionall & Social Strength",
  description = "Experience, regulate and express feelings Labelling emotions (emotional literacy) Understanding one’s self and others Making friends Building confidence and self-assurance",
  icon,
  backgroundColor,
  link = "#", // add a default link prop
  linkText = "Read More", // add a default link text prop
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full max-w-md p-4  rounded-lg shadow-md`}
      style={{ backgroundColor: `#${backgroundColor}` }}
    >
      <div className="flex justify-between flex-col items-center">
        <div className="flex w-full flex-row justify-between">
          {/* <div className="w-[219px] text-white text-[27px] font-normal font-fredoka leading-[29px]">Emotional & <br/>Social Strength</div> */}
          <h5 className="text-white font-bold  text-[28px] font-fredoka leading-[32px]">
            {title}
          </h5>
          <Image  alt="Kindi"
            src={icon || KindiHeart}
            className="flex justify-center w-[20px] h-[20px]"
          />
        </div>
        {isOpen && (
          <div className="mt-4">
            <p className="text-white text-base font-semibold font-fredoka leading-[20px]">
              {description}
            </p>
            <a
              href={link}
              className="text-center text-white text-lg font-bold font-fredoka uppercase  underline leading-relaxed mt-2"
            >
              {linkText}
            </a>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-[white]" />
          ) : (
            <Plus className="w-4 h-4 text-[white]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleCard;
