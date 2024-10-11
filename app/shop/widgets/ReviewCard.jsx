import { Ratings } from "@/public/Images";
import Image from "next/image";
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="bg-white hover:scale-105 cursor-pointer duration-700 min-w-[300px] gap-4 w-full flex flex-col rounded-[16px] hover:shadow-md p-4">
        {/* <p className="text-lg">{review.text}</p> */}
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
            Rating
          </div>
          <div className="text-[#0a1932] text-xs font-normal font-fredoka leading-none">
            100% (502) reviews
          </div>
        </div>
        <div className="flex items-center ">
          <div className="w-full text-[#0a1932] text-xs font-normal font-fredoka leading-none">
            Good Quality product. Fast delivery time. Material was good. Product
            which shows in pictures you `&apos;` ll get same as it is in real.
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-row gap-2 justify-start items-start">
            <Image
              src={review.avatar}
              alt={review.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col justify-start items-start gap-1">
              <h5 className="font-semibold text-[#0a1932] text-xs font-fredoka">
                {review.name}
              </h5>
              <p className="text-black text-[10px] font-normal font-fredoka leading-none">
                {review.date}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <Image  alt="Kindi" src={Ratings} className="w-4 h-4" />
            <div className="text-[#0a1932] text-base font-semibold font-fredoka leading-tight">
              5.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
