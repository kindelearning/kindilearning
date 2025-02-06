import { Logo } from "@/public/Images";
import { TemplateOne } from "../Sections/Prinables/MyDocument";
import React from "react";
import Image from "next/image";

const ActivityCard = ({
  ageRange,
  activityName,
  activityDate,
  theme,
  setUpTime,
  difficulty,
  areaOfLearning,
  skillsCategory,
  learningObjectives,
  images,
}) => {
  return (
    <section className="w-full h-auto py-20 shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-[16px] items-center justify-center flex flex-row">
      <div className="w-full h-full px-4 flex flex-col gap-6 claracontainer bg-white rounded-xl">
        {/* Logo */}
        <div className="flex">
          <div className="logo">
            <Image
              src={Logo}
              alt="Logo"
              className="lg:w-[110px] w-[80px] md:w-[100px] lg:max-h-[50px]"
            />
          </div>
        </div>

        {/* Activity Header */}
        <div className="w-full">
          <span className="text-[#f16463] lg:text-[64px] text-[32px] font-semibold font-fredoka">
            Activity:{" "}
          </span>
          <span className="text-[#25408f] lg:text-[64px] text-[32px] font-semibold font-fredoka">
            {activityName}
          </span>
        </div>

        {/* Age Range */}
        {/* <div className=" text-right text-[#0a1932] text-xs font-normal font-fredoka leading-none">
          {ageRange}
        </div> */}

        {/* Activity Details Section */}
        <div className="w-full flex justify-between items-start gap-[24px] ">
          {/* Column -1  */}
          <div className="w-full flex-col justify-start items-start gap-4 inline-flex">
            {/* Activity Date */}
            <div className="w-full p-4 bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Activity Date:{" "}
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {activityDate}
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="w-full p-4 bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Theme:
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {theme}
                </div>
              </div>
            </div>

            {/* Set up time */}
            <div className="w-full p-4  bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Set up Time:
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {setUpTime}
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="w-full p-4  bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Difficulty:
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {difficulty}
                </div>
              </div>
            </div>
          </div>

          {/* Column -2  */}
          <div className="w-full flex-col justify-start items-start gap-4 inline-flex">
            {/* Area of Learning */}
            <div className="w-full p-4 bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Area of Learning:{" "}
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {/* Add icons here */}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="w-full h-full p-4 bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
              <div className="w-full  mt-8 flex-col justify-center items-start -gap-[10px] inline-flex">
                <div className="text-[#f16463] text-[40px] font-semibold font-fredoka leading-normal">
                  Skills Category:{" "}
                </div>
                <div className="text-[#25408f] text-[40px] font-semibold font-fredoka leading-normal">
                  {skillsCategory}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Images */}
        <div className="w-full justify-between grid grid-cols-4 items-center">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="w-[240px] h-[240px] bg-[#e3e4ef] rounded-xl justify-center items-center flex overflow-hidden"
            >
              <img
                className="w-[240px] h-[240px]"
                src={image}
                alt={`activity-image-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="h-full flex-col justify-start items-center gap-[91px] inline-flex">
          {learningObjectives.map((objective, index) => (
            <div
              key={index}
              className="w-full flex-col justify-start items-start gap-4 inline-flex"
            >
              <div className="w-full h-full p-4 bg-[#e3e4ef] rounded-[24px] justify-start items-center inline-flex">
                <div className="w-full  flex-col justify-center items-start -gap-[10px] inline-flex">
                  <div className="text-[#f16463] text-[32px] font-medium font-fredoka leading-normal">
                    Accordion Question:{" "}
                  </div>
                  <div className="text-[#25408f] text-[24px] font-normal font-fredoka leading-normal">
                    {objective}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Page({ activityData }) {
  return (
    <ActivityCard
      ageRange="4-5 years"
      activityName="Recycled Cardboard Stars"
      activityDate="28/1/2025"
      theme="Winter"
      setUpTime="Under 5 Minutes"
      difficulty="Explorers"
      areaOfLearning="Fine Motor, Crafts, Rainy Day Play"
      skillsCategory="Fine Motor, Crafting"
      learningObjectives={[
        "Your child learns about creativity as they express themselves through art.",
        "Your child will work on fine motor skills as they cut, glue, and assemble the project.",
      ]}
      images={[
        "path-to-image1.jpg",
        "path-to-image2.jpg",
        "path-to-image1.jpg",
        "path-to-image2.jpg",
      ]}
    />
  );
}
