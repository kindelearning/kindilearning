"use client";
import { use, useEffect, useRef, useState } from "react";

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
import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";
import { getIconForSkill } from "@/app/p/activities/Sections/ActivityCard";

const PopularActivityCarousel = () => {
  // const [activities, setActivities] = useState(null); // Activitie
  const [error, setError] = useState(null);
  const [popularActivities, setPopularActivities] = useState([]); // Popular activities state

  // Mouse dragging state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null); // Create a reference for the scroll container

  // Fetch activities data
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const response = await fetch(
          "https://kindiadmin.up.railway.app/api/activities?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          const popularActivities = data.data.filter(
            (activity) => activity.isPopular === "Yes"
          );
          setPopularActivities(popularActivities);
        } else {
          setError("Error fetching activities data");
        }
      } catch (error) {
        setError("Error fetching activities data");
      }
    };

    fetchActivitiesData();
  }, []);
  // Handle loading and error states
  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log("Activities fetched on Popular actviity componenet");

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
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          className="flex mx-1 overflow-x-auto py-2 scrollbar-hidden px-4 lg:px-0 w-full claracontainer gap-4 scrollbar-hidden"
        >
          {popularActivities ? (
            <>
              {popularActivities.map((activity) => (
                <div key={activity.documentId}>
                  <article className="claraShadow overflow-clip rounded-3xl lg:max-w-[300px] lg:w-full">
                    <Link
                      target="_blank"
                      href={`/p/activities/${activity.documentId}`}
                    >
                      <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                        <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex lg:min-w-[300px]">
                          <div className="w-full max-w-[240px] lg:max-w-full h-auto">
                            <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[260px] lg:h-full lg:max-h-[260px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                              <img
                                width={280}
                                height={250}
                                alt={activity?.Title || "No Title"} // Fallback for alt text
                                className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                                // src={
                                //   activity?.Gallery?.[0]?.url ||
                                //   "/Images/shop/ProductImage.png"
                                // } // Fallback for image source
                                src={
                                  `https://kindiadmin.up.railway.app${activity?.Gallery?.[0]?.url}` ||
                                  "/Images/shop/ProductImage.png"
                                }
                              />
                            </div>
                            <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                              <div className="flex-col w-full gap-[6px] justify-start items-start">
                                <div className="text-[#0a1932] text-[16px] lg:text-xl font-semibold font-fredoka leading-[20px]">
                                  {activity?.Title?.length > 25
                                    ? `${activity.Title.slice(0, 20)}...`
                                    : activity?.Title || "Untitled"}{" "}
                                  {/* Fallback for Title */}
                                </div>
                                <div className="justify-start list-disc w-full items-center gap-1 inline-flex">
                                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                    {activity?.SetUpTime || "No setup time"}{" "}
                                    {/* Fallback for SetUpTime */}
                                  </div>
                                  •
                                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                    {activity?.Theme || "No theme"}{" "}
                                    {/* Fallback for Theme */}
                                  </div>
                                  •
                                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                    {activity?.FocusAge ||
                                      "No focus age specified"}{" "}
                                    {/* Fallback for FocusAge */}
                                  </div>
                                </div>
                              </div>

                              <div className="items-center justify-center gap-2">
                                {activity?.LearningAreaIcons ? (
                                  <>
                                    {activity?.LearningAreaIcons?.length > 4 ? (
                                      // Content for when length is greater than 4
                                      <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                        {activity?.LearningAreaIcons?.slice(
                                          0,
                                          4
                                        ).map((skill, index) => {
                                          const skillTitle =
                                            skill?.children?.[0]?.text;
                                          const iconUrl =
                                            getIconForSkill(skillTitle);
                                          return (
                                            <div
                                              key={index}
                                              className="activity-icon flex items-center gap-2"
                                            >
                                              {iconUrl && (
                                                <img
                                                  title={skillTitle}
                                                  src={iconUrl.src}
                                                  alt={skillTitle}
                                                  className="w-6 lg:w-10 lg:h-10 h-6"
                                                  width={iconUrl.width}
                                                  height={iconUrl.height}
                                                />
                                              )}
                                            </div>
                                          );
                                        })}
                                        <div className="w-[20px] lg:w-[36px] lg:h-[40px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]">
                                          <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                            +1
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      // Default content for 4 or fewer icons
                                      <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                        {activity?.LearningAreaIcons?.map(
                                          (skill, index) => {
                                            const skillTitle =
                                              skill?.children?.[0]?.text;
                                            const iconUrl =
                                              getIconForSkill(skillTitle);
                                            return (
                                              <div
                                                key={index}
                                                className="activity-icon flex items-center gap-2"
                                              >
                                                {iconUrl && (
                                                  <img
                                                    title={skillTitle}
                                                    src={iconUrl.src}
                                                    alt={skillTitle}
                                                    className="w-6 lg:w-10 lg:h-10 h-6"
                                                    width={iconUrl.width}
                                                    height={iconUrl.height}
                                                  />
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </>
          ) : null}
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
