import { TeamMember } from "@/public/Images";
import Image from "next/image";
import React from "react";

const Team = ({
  bgColor = "#ff8e00",
  imageSrc,
  title = "JANINE HAENEL",
  degree = "BA (Hons) Childhood Studies (Level 6)",
  description = "Janine’s nickname is ‘The Child Whisperer”. Her ability to assess the developmental needs of children and deliver educational activities to satisfy them is legendary. Janine’s time as an early learning expert has developed educational play approaches that deliver tangible results.",
}) => {
  return (
    <>
      <section className="max-w-full h-full w-full flex flex-col justify-start p-0">
        <div
          style={{ backgroundColor: bgColor }}
          className={`w-full bg-[${bgColor}] rounded-xl flex flex-col lg:flex-row xl:flex-row`}
        >
          <Image alt="Kindi"
            className="w-full max-h-[400px] object-cover md:w-full lg:max-w-[240px] lg:max-h-[330px] lg:h-full h-auto rounded-l-[12px] "
            src={imageSrc || TeamMember}
          />
          <div className="flex-1 p-4 h-auto md:min-h-[330px] lg:h-auto flex flex-col justify-start items-start gap-3">
            <div className="flex flex-col gap-[8px]">
              <div className="text-white text-2xl font-semibold font-fredoka uppercase leading-[28px]">
                {title}
              </div>
              <div className="text-white text-[16px]  md:text-[16px]  font-medium font-fredoka leading-[24px]">
                {degree}
              </div>
            </div>
            <div className="h-[1px] w-full border border-white"></div>
            <div className="text-white text-base font-medium font-montserrat leading-snug">
              {description}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
