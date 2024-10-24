"use client";

import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/lib/hygraph";
import {
  HomeHero,
  HomeHeroFour,
  HomeHeroOne,
  HomeHeroThree,
  HomeHeroTwo,
} from "@/public/Images";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroImageGif = [
  { id: 1, src: HomeHeroOne },
  { id: 2, src: HomeHeroTwo },
  { id: 3, src: HomeHeroThree },
  { id: 4, src: HomeHeroFour },
  { id: 4, src: HomeHero },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HeroImageGif.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [HeroImageGif.length]);

  return (
    <div className="w-full md:min-w-[300px] block md:w-[300px] lg:w-full justify-center items-center h-auto animate-fade-in relative">
      {HeroImageGif.map((image, index) => (
        <Image
          key={image.id}
          alt="Kindi"
          src={image.src}
          className={`absolute w-[full h-[400px] items-center top-0 left-0 md:min-w-[300px] md:w-[400px] lg:w-full object-contain ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        />
      ))}
    </div>
  );
};

export default function Hero({ homeData }) {
  const { data: session, status } = useSession();


  return (
    <section className="w-full h-screen lg:h-auto bg-purple py-12 md:py-24 lg:py-28 items-center justify-center flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer w-full flex flex-col-reverse justify-between lg:flex-row px-0 md:px-6 lg:px-0 xl:px-0 bg-purple xl:flex-row gap-8 md:gap-0 lg:gap-4 ">
        <div className="h-auto w-full md:min-w-[50%] lg:w-full flex-col px-4 md:px-0 lg:px-4 justify-center items-start gap-6 md:gap-7 lg:gap-8 xl:gap-10 inline-flex ">
          <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-2 lg:gap-4 xl:gap-4 ">
            <div className="text-white animate-text-reveal clarascript ">
              Early Learning for a Lifetime of Achievement
            </div>
            <div className="flex flex-col w-full justify-start items-start gap-3 lg:gap-6 animate-fade-in ">
              <div className="w-full lg:w-[max-content]">
                <span className="text-white claraheading md:text-[24px] md:leading-[26px] lg:text-[50px] lg:leading-[56px]  font-bold font-fredoka capitalize animate-fade-in">
                  Brain Development Activities
                </span>
                <br />
                <span className="text-light-purple-100 claraheading md:text-[24px] md:leading-[26px] font-normal font-fredoka capitalize animate-fade-in">
                  {" "}
                </span>
                <span className="text-red claraheading md:text-[24px] md:leading-[26px] lg:text-[50px] lg:leading-[56px]  animate-fade-in">
                  for 0 - 5 Year Olds
                </span>
              </div>
              <div className="w-full h-auto text-white clarabody animate-fade-in">
                <p>{homeData[0].hero}</p>
              </div>
            </div>
          </div>
          <div className="w-auto animate-fade-in">
            <Button
              onClick={() => (window.location.href = "#pricing_Section")}
              className="bg-red hover:bg-hoverRed clarabutton"
            >
              {session ? "Upgrade" : "Get Started"}
            </Button>
          </div>
        </div>
        <div className="w-full flex md:min-w-[300px] items-start justify-center h-fit min-h-[400px] md:w-[300px] lg:w-full ">
          <ImageSlider />
        </div>
      </div>
    </section>
  );
}
