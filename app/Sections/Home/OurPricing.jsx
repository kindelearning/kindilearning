"use client";

import NotFound from "@/app/not-found";
import { PricingCard } from "@/app/Widgets";
import { getHomeData } from "@/lib/hygraph";
import {
  FamilyPlusThumb,
  PricingThumb,
  ProfessionalThumb,
} from "@/public/Images";
import React, { useState } from "react";

const OurPricing = async () => {
  const [selectedTab, setSelectedTab] = useState("Monthly");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const homeData = await getHomeData();
  console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.ourPricing) {
    return <NotFound />;
  }
  return (
    <>
      <section
        className="w-full h-auto bg-[#EAEAF5] py-12 items-center justify-center flex flex-col gap-[20px] transition-all duration-500"
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
                description="No more guesswork! Unlock your child’s full potential with our affordable Milestone Tracker—an essential tool for every parent. Ensure your child gets the right support when they need it, keeping them on track and maximizing their brain growth effortlessly."
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
                title="Professional"
                description="Enhance children’s development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
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
                description="No more guesswork! Unlock your child’s full potential with our affordable Milestone Tracker—an essential tool for every parent. Ensure your child gets the right support when they need it, keeping them on track and maximizing their brain growth effortlessly."
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
                description="Enhance children’s development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
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
                title="Annual Family"
                description="Enhance children’s development and simplify your workload with Kindi Professional. Our ready-to-use, play-based education activities and professional development resources equip educators to provide every child and family with the outstanding support they need for a bright and successful future."
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
