import NotFound from "@/app/not-found";
import { getHIWData } from "@/lib/hygraph";
import {
  AgeCardFour,
  AgeCardOne,
  AgeCardThree,
  AgeCardTwo,
  AgeRangeArrow,
  User,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AgeCard = ({ bgImage, image, title, body, link }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full min-h-[390px] min-w-[280px]  flex flex-col bg-[#ffffff00] rounded-[24px] justify-between items-start px-8 py-4"
      >
        <div className="flex w-full items-center justify-start flex-col">
          <Image
            alt="Kinfi"
            src={image || User}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
          <h2 className="text-[#0a1932] w-full text-[18px] font-semibold font-fredoka text-start leading-[20px] mt-4">
            {title || "title"}
          </h2>
          <p className="text-[#0a1932] w-full text-[16px] font-medium font-fredoka leading-[20px] text-start mt-2">
            {body || "Description"}
          </p>
        </div>
        <Link href={link || "#"} className="w-full justify-start items-start">
          <div className="w-full bg-[#ada5a500] border-[#ffffff00] text-center text-red hover:underline hover:bg-[#f05c5c00] clarabutton mt-8">
            Read More
          </div>
        </Link>
      </div>
    </>
  );
};

const AgeRanges = async () => {
  const stories = await getHIWData();
  console.log("Story Page Data (in component):", stories);
  if (!stories || !stories[0]?.ageRanges) {
    console.error("Error: Stories data is missing or incomplete.");
    return <NotFound />;
  }
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* Top Heading Section */}
          <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
            <div className="text-start w-full md:text-center">
              <div>
                <span className="text-[#3f3a64] claraheading">
                  Flexible & Focused
                </span>
                <span className="text-red claraheading"> Age Ranges</span>
              </div>
            </div>
            <div className="flex w-full justify-start items-start flex-col">
              <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
                {/* We understand that managing multiple learning activities for
                children of different ages can be challenging. That&apos;s why
                we&apos;ve developed a mixed-age approach to educational play.
                This approach delivers age-appropriate outcomes using the same
                proven activity, allowing your six-month-old baby to join in
                with your five-year-old and benefit from the same fun learning
                experience. Our platform provides guidance for adults on
                delivering different learning outcomes for each age group. While
                every activity is focused on a broad age range, there&apos;s
                always something to learn for every young child taking part! */}
                <p>{stories[0].ageRanges}</p>
              </div>
            </div>
          </div>
          {/* Row Two */}
          <div className="w-full px-4 overflow-x-scroll scrollbar-hidden h-full py-6 flex-row justify-start items-center gap-[2px] flex ">
            <AgeCard
              image={AgeCardOne}
              bgImage="/Images/AgeRangeOne.svg"
              title="BABY (0+ YEARS)"
              body="Sensory play activities tailored for very young little ones, but appeal to all young children."
            />
            <Image src={AgeRangeArrow} className="w-[50px] h-[50px] -mx-3" />
            <AgeCard
              image={AgeCardTwo}
              bgImage="/Images/AgeRangeTwo.svg"
              body="Our learning activities help toddlers develop essential language, social, motor and cognitive skills — but babies and pre-schoolers can enjoy the fun, too!"
              title="TODDLER (18+ MONTHS)"
            />
            <Image src={AgeRangeArrow} className="w-[50px] h-[50px] -mx-3" />
            <AgeCard
              image={AgeCardThree}
              bgImage="/Images/AgeRangeThree.svg"
              body="Fun learning activities for children approaching the beginning of their school careers; these activities will also appeal to toddlers and babies."
              title="PRE-SCHOOLER (2.5+ YEARS)"
            />
            <Image src={AgeRangeArrow} className="w-[50px] h-[50px] -mx-3" />
            <AgeCard
              image={AgeCardFour}
              bgImage="/Images/AgeRangeFour.svg"
              title="KINDI (4+ YEARS)"
              body="Fun and engaging early years development activities for kindergarteners — Tailored developmental stages for toddlers, babies and pre-schoolers alike."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AgeRanges;
