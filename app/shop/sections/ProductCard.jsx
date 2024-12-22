"use client";

import { Ratings } from "@/public/Images";
import Image from "next/image";

const { useState, useEffect } = require("react");

export default function ProductCard({ image, title, price }) {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    // Function to generate a random number between 3 and 4.8, rounded to 1 decimal place
    const generateRandomRating = () => {
      const min = 3;
      const max = 4.8;
      const randomRating = (Math.random() * (max - min) + min).toFixed(1);
      return randomRating;
    };

    setRating(generateRandomRating());
  }, []);

  return (
    // <div className="flex max-w-[300px] min-w-[240px] w-full flex-col rounded-[24px] items-center gap-4 bg-white  hover:shadow-md">
    <div className="flex min-w-[170px]  lg:min-w-[240px]  max-w-[176px] md:min-w-full lg:w-full w-full flex-col rounded-[24px] lg:rounded-[24px] items-center gap-2 lg:gap-4 bg-white hover:shadow-md">
      <div className="flex rounded-t-[24px] overflow-clip w-full">
        <img
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full hover:scale-110 duration-300 h-[160px] md:h-[260px] lg:h-[260px] rounded-t-[12px] object-cover"
        />
      </div>
      <div className="claracontainer flex flex-col justify-start items-center w-full gap-2">
        <div className="flex items-center  px-4 w-full justify-between gap-2">
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            $ {price || "29"}
          </h1>
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image
              alt="Kindi"
              src={Ratings}
              className="text-yellow-400 w-4 h-4"
            />
            <span className="text-right text-[#0a1932] clarabodyTwo">
              {rating}+
            </span>
          </div>
        </div>
        <h3 className="text-start hidden md:flex text-[#0a1932] text-[10px] font-fredoka w-full px-4 pb-4 pt-2 text-base font-medium leading-[20px]">
          {title.length > 50 ? `${title.slice(0, 44)}...` : title}
        </h3>
        <h3 className="text-start flex md:hidden text-[#0a1932] text-[10px] font-fredoka w-full px-4 pb-4 pt-2 text-base font-medium leading-[20px]">
          {title.length > 24 ? `${title.slice(0, 22)}...` : title}
        </h3>
      </div>
    </div>
  );
}
export const MobileProductCard = ({ image, title, price }) => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    // Function to generate a random number between 3 and 4.8, rounded to 1 decimal place
    const generateRandomRating = () => {
      const min = 3;
      const max = 4.8;
      const randomRating = (Math.random() * (max - min) + min).toFixed(1);
      return randomRating;
    };

    setRating(generateRandomRating());
  }, []);

  return (
    <div className="flex lg:max-w-[300px] min-w-[170px] max-w-full lg:min-w-[240px] w-full flex-col rounded-[12px] items-center gap-2 lg:gap-4 bg-white hover:shadow-md">
      <div className="flex rounded-t-[12px] overflow-clip w-full">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full hover:scale-110 duration-300 h-[160px] md:h-[220px] rounded-t-[12px] object-cover"
        />
      </div>
      <div className="claracontainer flex flex-col justify-start min-h-[100px] items-start  w-full gap-2">
        <div className="flex items-center px-2 w-full justify-between gap-2">
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            $ {price || "29"}
          </h1>
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image
              alt="Kindi"
              src={Ratings}
              className="text-yellow-400 w-4 h-4"
            />
            <span className="text-right text-[#0a1932] clarabodyTwo">
              {rating}+
            </span>
          </div>
        </div>
        <h3 className="text-start text-[#0a1932] clarabodyTwo font-medium w-full px-2 pb-4 lg:pb-0">
          {title.length > 30 ? `${title.slice(0, 24)}...` : title}
        </h3>
      </div>
    </div>
  );
};
