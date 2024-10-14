"use client";

import { Button } from "@/components/ui/button";
import { PricingThumb } from "@/public/Images";
import { Check, ChevronDown, ChevronUp, CircleHelp, Minus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AccordianList = ({
  text = "I am the List item",
  isActive = false,
  trailingIcon = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CircleHelp className="w-4 h-4 text-[#c4c4c4]" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}) => {
  return (
    <div className="flex w-full items-center flex-row justify-between gap-2">
      <div className="flex justify-start gap-2 items-center">
        <div
          className={`rounded-full flex justify-center items-center p-1 w-5 h-5 bg-${
            isActive ? "red" : "[#999999]"
          }`}
        >
          <span className="w-3 h-3 flex justify-center items-center">
            {isActive ? (
              <Check className="w-3 h-3 text-[#ffffff] font-extrabold" />
            ) : (
              <Minus className="w-3 h-3 text-[#ffffff] font-extrabold" />
            )}
          </span>
        </div>
        <span className="text-sm">{text}</span>
      </div>
      {trailingIcon}
    </div>
  );
};

const PricingCard = ({
  image,
  title = "Family",
  description = "Enjoy every precious moment with your little ones with confidence as they explore and learn. Our affordable 'Milestone Tracker' is an essential tool for parents, ensuring each child receives the necessary attention when they need it on their developmental journey.",
  price = "$9.99",
  duration = "/Monthly",
  services = ["Service 1", "Service 2", "Service 3"],
  isOpen = false,
  paymentLink,
  isActive = [false, true, false],
}) => {
  const { data: session, status } = useSession();

  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

  return (
    <div className="w-full max-w-[360px] h-auto bg-[#ffffff] rounded-[32px] items-center justify-center flex flex-col gap-[20px] ">
      <Image src={image || PricingThumb} alt="Pricing Image" />
      <div className="flex flex-col justify-normal items-start px-4 py-8">
        <div className="flex flex-col gap-6 justify-normal items-start px-4">
          <div className="flex flex-col justify-between items-start">
            <div className="text-[#3f3a64] text-[28px] lg:text-[30px]  font-semibold font-fredoka capitalize leading-10">
              {title}
            </div>
            <div className="text-[#3f3a64] text-base font-normal font-montserrat leading-tight">
              {description}
            </div>
          </div>
          <div className="text-center text-red text-xl font-semibold font-fredoka leading-[16px]">
            Top Features
          </div>
          {isAccordionOpen && (
            <div className="w-full">
              <div className="w-full flex flex-col gap-1">
                {services.map((service, index) => (
                  <AccordianList
                    key={index}
                    text={service}
                    isActive={isActive[index]}
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            className="bg-[#f05c5c00] hover:bg-[#f05c5c00] rounded-[32px] flex py-2 px-0 "
            // onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <div className="w-[max-content] text-[#3f3a64] text-sm font-bold font-fredoka uppercase leading-10">
              Discover {isAccordionOpen ? "Less" : "More"}
            </div>
            {isAccordionOpen ? (
              <ChevronUp className="text-[#3f3a64]" />
            ) : (
              <ChevronDown className="text-[#3f3a64]" />
            )}
          </Button>
        </div>
        <div className="flex w-full flex-row justify-between gap-4 items-center px-4">
          {session ? (
            <Link target="_blank" href={paymentLink}>
              <Button className="bg-red py-2 px-6 rounded-[12px] text-white hover:border-hoverRed hover:bg-hoverRed clarabutton">
                Upgrade
              </Button>
            </Link>
          ) : (
            <Link target="_blank" href="/auth/sign-up">
              <Button className="bg-red py-2 px-6 rounded-[12px] text-white hover:border-hoverRed hover:bg-hoverRed clarabutton">
                Get Started
              </Button>
            </Link>
          )}

          <p className="text-4xl flex flex-col justify-end items-end font-semibold font-fredoka text-end text-red">
            {price}
            <span className="text-center text-[#3f3a64] text-[13px] font-normal font-montserrat leading-tight">
              {duration}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
