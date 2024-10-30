"use client";

import {
  pricingDetails,
  pricingDetailsFamily,
  pricingDetailsFamilyPlus,
  pricingDetailsProfessional,
} from "@/app/constant/standard";
import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getHomeData } from "@/lib/hygraph";
import {
  FamilyPlusThumb,
  PricingThumb,
  ProfessionalThumb,
} from "@/public/Images";
import { Check, ChevronDown, ChevronUp, CircleHelp, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AccordianList = ({
  text = "I am the List item",
  help = "This is the help text",
  isActive = false,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipOpen((prev) => !prev);
  };
  return (
    <div className="flex w-full items-center flex-row justify-between gap-2">
      <div className="flex justify-start gap-2 items-center">
        <div
          className={`rounded-full flex justify-center items-center p-1 w-4 h-4 bg-${
            isActive ? "red" : "gray-400"
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
        <span className="text-sm clarabodyTwo">
          {text.length > 32 ? `${text.slice(0, 30)}...` : text}
        </span>
      </div>
      <TooltipProvider>
        <Tooltip
          side="left"
          align="center"
          open={isTooltipOpen}
          onOpenChange={setIsTooltipOpen}
        >
          <TooltipTrigger onClick={toggleTooltip}>
            <CircleHelp className="w-4 h-4 hover:text-black text-[#c4c4c4]" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] text-start shadow-md">
            <p>{help}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const PricingCard = ({
  image,
  title = "Family",
  description,
  price,
  duration,
  pricingDetails,
  isOpen = false,
  paymentLink,
  toggleAccordion, // Receive the toggle function
}) => {
  return (
    <div className="w-full min-w-[300px] md:min-w-[340px] lg:min-w-[300px] max-w-[360px] h-auto bg-[#ffffff] rounded-[32px] items-start justify-center flex flex-col gap-[20px] ">
      <div className="flex w-full rounded-t-[32px] h-full min-h-[260px] max-h-[260px] object-cover overflow-clip">
        <Image
          src={image || PricingThumb}
          alt="Pricing Image"
          className="min-h-[260px] object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-normal items-start px-4 py-8">
        <div className="flex flex-col gap-6 justify-normal items-start px-0">
          <div className="flex flex-col justify-between gap-4 items-start">
            <div className="text-[#3f3a64] text-[28px] lg:text-[30px] leading-[30px] lg:leading-[32px] font-semibold font-fredoka capitalize ">
              {title}
            </div>
            <div className="text-[#3f3a64] h-[240px] clarabodyTwo font-montserrat">
              {description}
            </div>
          </div>
          <div className="text-center text-red text-xl font-semibold font-fredoka leading-[16px]">
            Top Features
          </div>
          {isOpen && (
            <div className="w-full">
              <div className="w-full flex flex-col gap-2">
                {pricingDetails.map((detail, index) => (
                  <AccordianList
                    key={detail.id}
                    text={detail.title}
                    help={detail.helpText}
                    isActive={detail.isActive}
                  />
                ))}
              </div>
            </div>
          )}
          <div
            className="bg-[#f05c5c00] hover:bg-[#f05c5c00] items-center rounded-[32px] flex py-0 px-0 "
            onClick={(e) => {
              e.preventDefault(); // Prevent default action
              toggleAccordion(); // Call the toggle function
            }}
          >
            <div className="w-[max-content] text-[#3f3a64] text-sm text-start font-bold font-fredoka uppercase leading-10">
              {isOpen ? "Discover Less" : "Discover More"}
            </div>
            {isOpen ? (
              <ChevronUp className="text-[#3f3a64]" />
            ) : (
              <ChevronDown className="text-[#3f3a64]" />
            )}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-4 items-center px-0">
          <Link target="_blank" href={paymentLink}>
            <Button className="bg-red py-2 px-6 rounded-[12px] text-white clarabutton hover:border-2 hover:border-white hover:shadow-sm  hover:bg-hoverRed clarabutton">
              Get Started
            </Button>
          </Link>
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

const OurPricing = async () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Monthly"); // Default to Monthly

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleTab = (tab) => {
    setSelectedTab(tab); // Change the selected tab
  };

  const homeData = await getHomeData();
  // console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.ourPricing) {
    return <NotFound />;
  }
  return (
    <>
      <section
        id="pricing_Section"
        className="w-full h-auto bg-[#EAEAF5] pt-12 pb-[120px] items-center justify-center flex flex-col gap-[20px] transition-all duration-500"
        style={{
          animation: "fadeIn 1s ease-in-out",
          animationFillMode: "forwards",
        }}
      >
        <div
          className="claracontainer w-full py-6 gap-4 md:gap-4 flex-col justify-start items-center inline-flex"
          style={{
            animation: "slideInUp 1s ease-in-out 0.5s",
            animationFillMode: "forwards",
          }}
        >
          <div className="w-full text-red clarascript px-4 md:px-0 text-start md:text-center">
            Affordable Early Years Education for All{" "}
          </div>
          <div className="flex w-full px-4 md:px-0 container justify-start md:justify-center items-start md:items-center gap-4 flex-col">
            <div
              className="w-full max-w-[683px] text-start md:text-center mx-auto"
              style={{
                animation: "fadeIn 1s ease-in-out 1s",
                animationFillMode: "forwards",
              }}
            >
              <span className="text-[#3f3a64] claraheading text-start md:text-center capitalize ">
                Our{" "}
              </span>
              <span className="text-red claraheading text-start md:text-center capitalize">
                Pricing
              </span>
            </div>
            <div
              className="w-full px-0 md:px-24 lg:px-48 mx-auto text-start md:text-center text-[#3f3a64] font-medium font-fredoka capitalize clarabodyTwo"
              style={{
                animation: "fadeIn 1s ease-in-out 1.5s",
                animationFillMode: "forwards",
              }}
            >
              <p>{homeData[0].ourPricing}</p>
            </div>
          </div>
        </div>

        <div
          className="flex bg-[white] rounded-[20px] px-2 w-[max-content] py-2 justify-center items-center gap-2"
          style={{
            animation: "slideInUp 1s ease-in-out 2s",
            animationFillMode: "forwards",
          }}
        >
          <div
            className={`text-[#3F3D91] rounded-[10px]  font-medium flex px-6 justify-center items-center p-2 ${
              selectedTab === "Monthly"
                ? "bg-[#3F3D91] text-[#ffffff]"
                : "bg-[white]  text-[#3F3D91]"
            } transition-all duration-500`}
            onClick={() => handleTabChange("Monthly")}
          >
            Monthly
          </div>
          <div
            className={`text-[#3F3D91] rounded-[10px] font-medium flex flex-col px-6 justify-center items-center py-2  ${
              selectedTab === "Annually"
                ? "bg-[#3F3D91] text-[#ffffff]"
                : "bg-[white]  text-[#3F3D91]"
            } transition-all duration-500`}
            onClick={() => handleTabChange("Annually")}
          >
            Annually
          </div>
        </div>

        <div
          className="scrollable-pricing px-2 lg:px-4 md:px-2 w-full claracontainer gap-4"
          style={{
            animation: "fadeIn 1s ease-in-out 2.5s",
            animationFillMode: "forwards",
          }}
        >
          {selectedTab === "Monthly" ? (
            <div
              className="flex flex-nowrap overflow-x-auto justify-start md:justify-start lg:justify-center lg:items-start items-start scrollbar-hidden px-0 w-full claracontainer gap-2 md:gap-4 scrollbar-hidden"
              style={{
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <PricingCard
                title="Family"
                paymentLink="https://buy.stripe.com/6oEbKT0yJa5qbPG28h"
                description="No more guesswork! Unlock your child's full potential with our affordable Milestone Tracker—an essential tool for every parent. Ensure your child gets the right support when they need it, keeping them on track and maximizing their brain growth effortlessly."
                price="$19.99"
                duration="/Yearly"
                pricingDetails={pricingDetailsFamily}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
                image={PricingThumb}
              />
              <PricingCard
                title="Family Plus"
                paymentLink="https://buy.stripe.com/aEU6qz6X7elG1b2aEI"
                description="Unlock the secrets to child success with our engaging learning activities that turn playtime into brain time. Expertly designed to stimulate brain development through easy-to-follow guided play, you’ll build a strong foundation for lifelong success. Watch your child thrive with confidence—start today!"
                price="$19.99"
                duration="/Yearly"
                pricingDetails={pricingDetailsFamilyPlus}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
                image={FamilyPlusThumb}
              />
              <PricingCard
                image={ProfessionalThumb}
                paymentLink="https://buy.stripe.com/fZe2ajepz3H2cTKbIO"
                title="Professional"
                description="Enhance children's development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
                price="$19.99"
                duration="/Yearly"
                pricingDetails={pricingDetailsProfessional}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
              />
            </div>
          ) : (
            <div
              className="flex flex-nowrap overflow-x-auto justify-start md:justify-start lg:justify-center lg:items-start items-start scrollbar-hidden px-0 w-full claracontainer gap-4 scrollbar-hidden"
              style={{
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <PricingCard
                title="Annual Family Plus"
                paymentLink="https://buy.stripe.com/5kAdT14OZelG9HydQY"
                description="No more guesswork! Unlock your child's full potential with our affordable Milestone Tracker—an essential tool for every parent. Ensure your child gets the right support when they need it, keeping them on track and maximizing their brain growth effortlessly."
                price="$19.99"
                duration="/Yearly"
                pricingDetails={pricingDetailsFamily}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
                image={PricingThumb}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 3s",
                  animationFillMode: "forwards",
                }}
              />
              <PricingCard
                title="Annual Professional"
                description="Enhance children's development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
                price="$19.99"
                duration="/Yearly"
                paymentLink="https://buy.stripe.com/4gw7uD1CNgtOf1SdQX"
                pricingDetails={pricingDetailsFamilyPlus}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
                image={FamilyPlusThumb}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 3.5s",
                  animationFillMode: "forwards",
                }}
              />
              <PricingCard
                paymentLink="https://buy.stripe.com/00g02bgxH7Xi6vm8wB"
                image={ProfessionalThumb}
                title="Annual Family"
                description="Enhance children's development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
                price="$19.99"
                duration="/Yearly"
                pricingDetails={pricingDetailsProfessional}
                isOpen={isAccordionOpen} // Pass the state here
                toggleAccordion={toggleAccordion} // Pass toggle function
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 4s",
                  animationFillMode: "forwards",
                }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OurPricing;
