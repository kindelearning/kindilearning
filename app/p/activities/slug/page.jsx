"use client";

import { Button } from "@/components/ui/button";
import { Confidence } from "@/public/Icons";
import {
  ActivityBlack,
  ActivityImage,
  CompletedMark,
  Kid,
  KidBlack,
  KindiHeart,
  Print,
  PromotionalImage,
  Themes,
  TimerBlack,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex claracontainer w-full flex-col items-start">
      {/* Featured Image */}
      <div className="w-full rounded-[16px] h-full max-h-[400px] md:h-full lg:max-h-[400px] bg-clip-content flex items-center justify-center">
        <Image
          src={mainImage}
          className="rounded-[0px] object-contain  h-full max-h-[400px] md:h-full lg:max-h-[400px] w-full md:rounded-[16px]"
          alt="Product Image"
        />
      </div>
      <div className="flex max-w-[600px] px-2 scrollbar-hidden w-full overflow-x-auto py-4">
        <div className="flex flex-nowrap scrollbar-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[100px] flex h-[80px] cursor-pointer object-cover border-2 border-transparent hover:scale-105 duration-150 mr-4 ${
                mainImage === image ? "border-red" : ""
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                width={100}
                height={80}
                className="object-cover w-full h-full rounded-[12px]"
                alt="Product Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// const icons = [KindiHeart, Confidence, , ];
const icons = [
  {
    icon: Confidence,
    bgcolor: "C42797",
  },
  {
    icon: KindiHeart,
    bgcolor: "029871",
  },
  {
    icon: KindiHeart,
    bgcolor: "3F3A64",
  },
  {
    icon: Confidence,
    bgcolor: "FF8E00",
  },
];

const IconBadge = ({ icon, backgroundColor = "f05c5c" }) => {
  return (
    <div
      className={`w-[50px] h-[50px] flex justify-center items-center bg-[#${backgroundColor}] rounded-[16px]`}
    >
      <Image alt="Kindi" src={icon || KindiHeart} />
    </div>
  );
};

const Accordion = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-1 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#3f3a64] text-[16px] py-2 md:py-[10px] font-[550] font-fredoka">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300`}
        >
          <ChevronRight />
        </span>
      </div>
      {isOpen && (
        <div className="pb-4">
          <p className="text-base font-medium text-[#0A1932]">{description}</p>
        </div>
      )}
    </div>
  );
};

const sections = [
  { title: "Learning Objective", description: "" },
  { title: "What you need?", description: "" },
  { title: "Main Activity", description: "" },
  { title: "Different ways to play", description: "" },
  { title: "Expended Learning", description: "" },
];

const generateDescription = () => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const ActivityAttribute = ({
  title = " Event Timeline",
  features = " 18th September 2023",
  image,
}) => {
  return (
    <div className="w-full justify-between items-center inline-flex">
      <div className="justify-start w-full items-center gap-2 flex">
        <Image
          alt="Kindi"
          src={image || Themes}
          className="text-[#0a1932] w-4 h-4"
        />
        <div className=" text-[#0a1932] w-full text-[16px] font-normal font-fredoka leading-none">
          {title}
        </div>
      </div>
      <div className="text-[#0a1932] text-[16px] w-full justify-start items-center font-semibold font-fredoka leading-none">
        {features}
      </div>
    </div>
  );
};
const page = () => {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-0 px-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full hidden lg:flex text-[#3f3a64] claraheading capitalize">
            Noisy or Quiet? Learning Opposites a long title to example maximum
            space needed
          </div>
          {/* Row 1 */}
          <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] pb-4 lg:bg-[#eaeaf5] py-0 flex flex-col md:flex-col lg:flex-row xl:flow-row justify-between items-start gap-8">
            {/* Col 1(R1) */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              <ProductImages
                images={[
                  ActivityImage,
                  ActivityImage,
                  ActivityImage,
                  ActivityImage,
                  ActivityImage,
                  ActivityImage,
                  PromotionalImage,
                ]}
              />
            </div>
            {/* Col - 2(R1) */}
            <div className="claracontainer w-full flex flex-col px-4 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Autumn Scavenger Hunt{" "}
                </div>
                <div className="items-center w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute image={ActivityBlack} />
                  <ActivityAttribute
                    image={TimerBlack}
                    features="5 minutes"
                    title="Set up Time"
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features="Winter"
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features="Toddler"
                    title="Focus age"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>
                <div className="items-center justify-center flex flex-row gap-1">
                  {icons?.map((icon, index) => (
                    <IconBadge
                      key={index}
                      icon={icon.icon}
                      backgroundColor={icon.bgcolor}
                    />
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
                  <li className="leading-[20px]">Mastering Feelings</li>
                  <li className="leading-[20px]">Sensory Development</li>
                  <li className="leading-[20px]"> Listening & Talking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Row Two */}
          <div className="claracontainer py-0 px-4 flex flex-col md:flex-col lg:flex-row xl:flow-row justify-between items-start gap-8">
            {/* Col 1(R2) */}
            <div className="items-center w-full justify-center flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity resources{" "}
                </div>
                <Button className=" w-full flex md:hidden bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
                  {" "}
                  Resourses
                </Button>
              </div>
              {sections.map((section, index) => (
                <div className="w-full" key={index}>
                  <Accordion
                    description={generateDescription()}
                    title={section.title}
                  />
                </div>
              ))}
            </div>
            {/* Col 2(R2) */}
            <div className="flex w-full  flex-col py-6 md:py-0 justify-start items-start gap-2">
              <div className="w-full md:flex hidden justify-between items-center p-6 bg-white rounded-xl shadow">
                <ChevronLeft />
                <div className="text-center text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity date
                </div>
                <ChevronRight />
              </div>
              <div className=" px-4 md:flex hidden w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity resources{" "}
                </div>
                <Button className=" w-full md:flex hidden bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
                  {" "}
                  Resourses
                </Button>
              </div>
              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Print Activity{" "}
                </div>
                <Button className="w-full bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
                  {" "}
                  Print{" "}
                </Button>
              </div>
              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Mark Activity as Complete{" "}
                </div>
                <Button className="w-full bg-red text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
                  {" "}
                  Completed{" "}
                </Button>
              </div>
            </div>
          </div>
          {/* Row 3(C1) */}

          {/* Row 4(C1) */}
          <div className="flex md:hidden shadow-upper pt-2 pb-4 px-2 mb-[72px] rounded-t-[8px] justify-between items-center gap-1 bg-[white] shadow-sm fixed bottom-0 left-0 w-full">
            <Button className="flex bg-[#3f3a64] gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full">
              <Image alt="Kindi"  src={Print} />
              Print
            </Button>
            <Button className="flex bg-red gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full">
              <Image alt="Kindi"  src={CompletedMark} />
              Mark as Complete
            </Button>
          </div>
        </div>{" "}
      </section>
    </>
  );
};

export default page;
