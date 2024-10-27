"use client";

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
    <div className="w-full max-w-[360px] h-auto bg-[#ffffff] rounded-[32px] items-start justify-center flex flex-col gap-[20px] ">
      <div className="flex w-full rounded-t-[32px] h-full min-h-[260px] overflow-clip">
        <Image
          src={image || PricingThumb}
          alt="Pricing Image"
          className="min-h-[260px] object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-normal items-start px-4 py-8">
        <div className="flex flex-col gap-6 justify-normal items-start px-4">
          <div className="flex flex-col justify-between items-start">
            <div className="text-[#3f3a64] text-[28px] lg:text-[30px] leading-[30px] lg:leading-[32px] font-semibold font-fredoka capitalize ">
              {title}
            </div>
            <div className="text-[#3f3a64] h-[300px] lg:[260px] text-[16px] leading-[18px] font-normal font-montserrat">
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

const OurPricing = async () => {
  const [selectedTab, setSelectedTab] = useState("Monthly");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
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
          <button
            className={`text-[#3F3D91] rounded-[10px]  font-medium flex px-6 justify-center items-center p-2 ${
              selectedTab === "Monthly"
                ? "bg-[#3F3D91] text-[#ffffff]"
                : "bg-[white]  text-[#3F3D91]"
            } transition-all duration-500`}
            onClick={() => handleTabChange("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`text-[#3F3D91] rounded-[10px] font-medium flex flex-col px-6 justify-center items-center py-2  ${
              selectedTab === "Annually"
                ? "bg-[#3F3D91] text-[#ffffff]"
                : "bg-[white]  text-[#3F3D91]"
            } transition-all duration-500`}
            onClick={() => handleTabChange("Annually")}
          >
            Annually
          </button>
        </div>

        <div
          className="scrollable-pricing px-2 lg:px-4 md:px-4 w-full claracontainer gap-4"
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
                services={["Custom Service 1", "Custom Service 2"]}
                isOpen={true}
                image={PricingThumb}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 3s",
                  animationFillMode: "forwards",
                }}
              />
              <PricingCard
                title="Family Plus"
                paymentLink="https://buy.stripe.com/aEU6qz6X7elG1b2aEI"
                description="Unlock the secrets to child success with our engaging learning activities that turn playtime into brain time. Expertly designed to stimulate brain development through easy-to-follow guided play, you’ll build a strong foundation for lifelong success. Watch your child thrive with confidence—start today!"
                price="$19.99"
                duration="/Yearly"
                services={["Custom Service 1", "Custom Service 2"]}
                isOpen={true}
                image={FamilyPlusThumb}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 3.5s",
                  animationFillMode: "forwards",
                }}
              />
              <PricingCard
                image={ProfessionalThumb}
                paymentLink="https://buy.stripe.com/fZe2ajepz3H2cTKbIO"
                title="Professional"
                description="Enhance children's development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
                price="$19.99"
                duration="/Yearly"
                services={[
                  "Step-by-Step Brain Simulation Guide",
                  "Mutiage learning activities",
                ]}
                isOpen={true}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  animation: "slideInUp 1s ease-in-out 4s",
                  animationFillMode: "forwards",
                }}
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
                services={["Custom Service 1", "Custom Service 2"]}
                isOpen={true}
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
                services={["Custom Service 1", "Custom Service 2"]}
                isOpen={true}
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
                services={["Custom Service 1", "Custom Service 2"]}
                isOpen={true}
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
