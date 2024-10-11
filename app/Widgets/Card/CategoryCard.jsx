"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeDummy } from "@/public/Images";
import Link from "next/link";

const CountdownTimer = ({ endDate }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeLeft = endDate - now;

      if (timeLeft > 0) {
        setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((timeLeft / (1000 * 60)) % 60));
        setSeconds(Math.floor((timeLeft / 1000) % 60));
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <div className="px-4 py-2 bg-red rounded-xl justify-start items-start gap-1 inline-flex">
      <div className="text-white w-[max-content] text-xs font-normal font-fredoka leading-none">
        Adventure Countdown:
      </div>
      <div className="text-right w-[max-content] text-white text-xs font-semibold font-fredoka leading-none">
        {days} d, {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};
// const endDate = new Date("2025-12-31T23:59:59.999Z");
const CategoryCard = ({
  image,
  schedulesDate,
  header = "Winter Magic",
  description = "Snow adventure, ice castles, cozy indoor playtimes",
  buttonText = "Button Text",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex cursor-pointer flex-col justify-end relative">
      {" "}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex rounded-t-lg  overflow-clip">
          <Image
            width={400}
            height={300}
            src={image || ThemeDummy}
            alt="Category Image"
            className="w-full hover:scale-110  duration-500 ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-between py-2 flex-col w-full items-start">
              <h2 className="text-[#3f3a64] text-2xl font-semibold font-fredoka leading-tight">
                {header}
              </h2>

              <p className="text-[#0a1932] text-[16px] font-normal font-fredoka leading-[20px]">
                {description}
              </p>
            </div>

            <button
              className="border border-red text-red rounded-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="w-full flex justify-end px-4 -mt-4">
        <CountdownTimer endDate={schedulesDate} />
      </div>
    </div>
  );
};

export default CategoryCard;
