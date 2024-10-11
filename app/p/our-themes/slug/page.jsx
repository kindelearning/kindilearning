import { ThemeThumb } from "@/public/Images";
import Image from "next/image";
import React from "react";

const page = ({
  image,
  title = "Color Vibrant Adventures",
  subtitle = "Snow adventure, ice castles, cozy indoor playtimes",
  description = {
    about:
      "This category is all about winter magic.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.",
    expect:
      "You can expect snowflakes, hot chocolate, and more..Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat.Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat. Est enim ultrices pharetra sit elementum. Lorem ipsum dolor sit amet consectetur. At lectus diam a sit aliquet sollicitudin sagittis volutpat..",
  },
}) => {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center flex flex-col gap-[30px] md:gap-[60px] lg:gap-[80px]">
        <div className="relative w-full h-full ">
          <Image
            src={image || ThemeThumb}
            alt="Category Image"
            className="h-[200px] md:h-[300px] lg:h-[400px] w-full"
          />
        </div>
        <div className="claracontainer flex flex-col gap-8 mx-auto px-4">
          <div className="text-center flex flex-col gap-2 justify-start items-start">
            <h2 className="text-[#3f3a64]  claraheading text-start">{title}</h2>
            <p className=" text-[#0a1932]  text-start clarabody">{subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col w-full gap-[22px]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium font-fredoka">
                About the Category
              </h3>
              <p className=" text-justify text-[#0a1932] clarabody">
                {description.about}
              </p>
            </div>
            <div className="flex flex-col w-full gap-[22px]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium font-fredoka">
                What to Expect
              </h3>
              <p className=" text-justify text-[#0a1932] text-[20px] font-normal font-fredoka leading-[24px]">
                {description.expect}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
