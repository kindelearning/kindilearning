"use client";

import React, { useState, useEffect } from "react";

const DefaultReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      heading: (
        <div className="w-auto text-center">
          <span className="text-[#3f3a64] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Satisfied Parents & Teachers
          </span>
          <br />
          <span className="text-[#019acf] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            {" "}
          </span>
          <span className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Love the Learning success of Kindi{" "}
          </span>
        </div>
      ),
      body: (
        <div className="w-auto text-center max-w-[500px] text-white clarabodyTwo ">
          “You make the days fun and different which is most impressive. Our boy
          has achieved so many milestones because of Kindi”
        </div>
      ),
      color: "#00946C",
    },
    {
      heading: (
        <div className="w-auto text-center">
          <span className="text-[#3f3a64] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Satisfied Parents & Teachers
          </span>
          <br />
          <span className="text-[#019acf] text-4xl font-semibold font-fredoka capitalize leading-10">
            {" "}
          </span>
          <span className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Love the Learning success of Kindi{" "}
          </span>
        </div>
      ),
      body: (
        <div className="w-auto text-center max-w-[500px] text-white clarabodyTwo ">
          “You make the days fun and different which is most impressive. Our boy
          has achieved so many milestones because of Kindi”
        </div>
      ),
      color: "#F05455",
    },
    {
      heading: (
        <div className="w-auto text-center">
          <span className="text-[#3f3a64] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Satisfied Parents & Teachers
          </span>
          <br />
          <span className="text-[#019acf] text-4xl font-semibold font-fredoka capitalize leading-10">
            {" "}
          </span>
          <span className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Love the Learning success of Kindi{" "}
          </span>
        </div>
      ),
      body: (
        <div className="w-auto text-center max-w-[500px] text-white clarabodyTwo ">
          “You make the days fun and different which is most impressive. Our boy
          has achieved so many milestones because of Kindi”
        </div>
      ),
      color: "#F68B1F",
    },
    {
      heading: (
        <div className="w-auto text-center">
          <span className="text-[#3f3a64] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Satisfied Parents & Teachers
          </span>
          <br />
          <span className="text-[#019acf] text-4xl font-semibold font-fredoka capitalize leading-10">
            {" "}
          </span>
          <span className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Love the Learning success of Kindi{" "}
          </span>
        </div>
      ),
      body: (
        <div className="w-auto text-center max-w-[500px] text-white clarabodyTwo ">
          “You make the days fun and different which is most impressive. Our boy
          has achieved so many milestones because of Kindi”
        </div>
      ),
      color: "#0097CB",
    },
    {
      heading: (
        <div className="w-auto text-center">
          <span className="text-[#3f3a64] font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Satisfied Parents & Teachers
          </span>
          <br />
          <span className="text-[#019acf] text-4xl font-semibold font-fredoka capitalize leading-10">
            {" "}
          </span>
          <span className="text-white font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px] xl:text-[32px] xl:leading-[36px]">
            Love the Learning success of Kindi{" "}
          </span>
        </div>
      ),
      body: (
        <div className="w-auto text-center max-w-[500px] text-white clarabodyTwo ">
          “You make the days fun and different which is most impressive. Our boy
          has achieved so many milestones because of Kindi”
        </div>
      ),
      color: "#BE1A8D",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // setCurrentIndex((currentIndex + 1) % slides.length);
      if (!isPaused) {
        setCurrentIndex((currentIndex + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slides.length, isPaused]);

  // }, [currentIndex, slides.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full py-24 cursor-pointer items-center justify-center flex flex-col gap-[20px] transition-all duration-300 animate-fade-in"
      style={{
        backgroundColor: slides[currentIndex].color,
        padding: "20px",
        transition: "background-color 0.5s ease-in-out",
      }}
    >
      <div className="claracontainer w-full flex-col duration-150 animate-fade-in justify-start items-center inline-flex md:py-6 sm:py-4">
        <h2
          className="text-3xl font-fredoka text-white duration-150 animate-fade-in font-bold md:text-2xl sm:text-xl"
          style={{
            animation: "fadeIn 1s ease-in-out",
            animationFillMode: "forwards",
          }}
        >
          {slides[currentIndex].heading}
        </h2>
        <span
          className="text-lg text-white md:text-base duration-150 animate-fade-in sm:text-sm"
          style={{
            animation: "fadeIn 1s ease-in-out 0.5s",
            animationFillMode: "forwards",
          }}
        >
          {slides[currentIndex].body}
        </span>
      </div>
      <div className="flex pb-8 justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`w-4  duration-150 animate-fade-in  h-4 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-300"
            } md:w-3 md:h-3 sm:w-2 sm:h-2`}
            onClick={() => setCurrentIndex(index)}
            style={{
              transition: "background-color 0.3s ease-in-out",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default DefaultReviews;
