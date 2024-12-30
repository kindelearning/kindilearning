"use client";
import { useRef, useState } from "react";

import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";


const PopularActivityCarousel = ({ activities }) => {
  const scrollRef = useRef(null); // Create a reference for the scroll container



  // Mouse dragging state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const scrollmeLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="w-full flex items-center justify-center claracontainer ">
        <ChevronLeft
          // className="z-10 mx-4 hidden lg:flex cursor-pointer hover:bg-purple hover:text-white bg-[white] text-[20px] text-purple p-1 rounded-full"
          className=" w-[32px] cursor-pointer hover:bg-purple hover:text-white  h-[32px] hidden lg:flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          

          onClick={scrollmeLeft}
        />

        <div
          // ref={containerRef} 
          ref={scrollRef}
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}
       onMouseLeave={handleMouseUp}
       style={{ cursor: isDragging ? "grabbing" : "grab" }}
          className="flex mx-1 overflow-x-auto py-2 scrollbar-hidden px-4 lg:px-0 w-full claracontainer gap-4 scrollbar-hidden"
        >
          {activities.map((activity) => (
            <div key={activity.documentId}>
              <article className="claraShadow rounded-3xl lg:max-w-[300px] lg:w-full">
                <Link target="_blank" href={`/p/activities/${activity.documentId}`}>
                  <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                    <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex lg:min-w-[300px]">
                      <div className="w-full max-w-[240px]  lg:max-w-full h-auto  ">
                        <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[260px] lg:h-full lg:max-h-[260px] md:max-h-[300px]  overflow-clip rounded-t-3xl ">
                          <img
                            width={280}
                            height={250}
                            alt={activity.Title}
                            className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl "
                            src={activity.Gallery[0].url}
                          />
                        </div>
                        <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                          <div className="flex-col w-full gap-[6px] justify-start items-start">
                            <div className="text-[#0a1932] text-[16px] lg:text-xl font-semibold font-fredoka leading-[20px]">
                              {activity.Title.length > 25
                                ? `${activity.Title.slice(0, 20)}...`
                                : activity.Title}
                            </div>
                            <div className="justify-start list-disc w-full items-center gap-1 inline-flex">
                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                              {activity.SetUpTime}
                              </div>•
                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                {activity.Theme}
                              </div>•
                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                {activity.FocusAge}
                              </div>
                              {/* <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                {activity.skills
                                  .slice(0, 2)
                                  .map((skill, index) => (
                                    <li key={index}>{skill.slice(0, 8)}</li>
                                  ))}
                              </ul> */}
                            </div>
                          </div>
                          <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                            <Image
                              alt="Kindi"
                              className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                              src={SpeechLanguageActivity}
                            />
                            <Image
                              alt="Kindi"
                              className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                              src={DiscoveringOurWorldActivity}
                            />
                            <Image
                              alt="Kindi"
                              className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                              src={ReadingWritingActivity}
                            />
                            <Image
                              alt="Kindi"
                              className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                              src={ExperimentsMathActivity}
                            />
                            <div
                              className={`w-[20px] lg:w-[36px] lg:h-[40px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                            >
                              <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                +1
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>
        <ChevronRight
          // className="z-10 mx-4 hidden lg:flex cursor-pointer hover:bg-purple hover:text-white bg-[white] text-[20px] text-purple p-1 rounded-full"
          className=" cursor-pointer hover:bg-purple hover:text-white  w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"

          onClick={scrollRight}
        />
      </div>
    </>
  );
};

export default PopularActivityCarousel;
