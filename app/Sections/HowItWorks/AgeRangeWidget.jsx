"use client";

import { AgeCardOne, AgeRangeArrow, User } from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        className="w-full  min-h-[390px] overflow-clip h-[390px] border-t-2 border-b-2 min-w-[280px]  flex flex-col bg-[#ffffff00] rounded-[24px] justify-between items-start px-8 py-4"
      >
        <div className="flex w-full items-center justify-start flex-col">
          {image ? (
            <img
              alt="Kindi"
              src={image}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          ) : (
            <Image
              width={64}
              height={64}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              alt="Kindi"
              src={AgeCardOne}
            />
          )}
          <h2 className="text-[#0a1932] w-full text-[18px] font-semibold font-fredoka text-start leading-[20px] mt-4">
            {title || "title"}
          </h2>

          <div className="text-[#0a1932] prose w-full text-[16px] font-medium font-fredoka leading-[20px] text-start mt-2">
            {body || "Description"}
          </div>
        </div>
        <Link target="_blank"
          href={link || "/p/community"}
          className="w-full justify-start items-start"
        >
          <div className="w-full bg-[#ada5a500] border-0 text-center text-red hover:underline hover:bg-transparent clarabutton mt-2">
            Read More
          </div>
        </Link>
      </div>
    </>
  );
};
export default function AgeRangeWidget() {
  const scrollRef = useRef(null); // Create a reference for the scroll container

  useEffect(() => {
    const fetchHowItWorks = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Fetched data:", data);

        // Set fetched data and stop loading
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHowItWorks();
  }, []);

  // Function to handle scroll
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Amount to scroll on each click
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mouse dragging state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <div className="relative w-full lg:max-w-[1180px] px-4 min-h-[400px] py-6 flex justify-center items-center">
        {/* Left Arrow Button */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0  transform -translate-y-1/2 bg-[#6f6f6f] bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={() => handleScroll("left")}
          aria-label="Scroll Left"
        >
          <ChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          className="w-full flex-row justify-start items-center gap-[2px] flex overflow-x-auto scrollbar-hidden"
        >
          {data?.data?.AgeGroup?.Content &&
          data.data.AgeGroup.Content.length > 0 ? (
            <>
              {data.data.AgeGroup.Content.slice(0, 1).map((content, index) => (
                <AgeCard
                  key={index}
                  // image={
                  //   content?.Icon ? content?.Icon.url : "/Images/AgeCardOne.svg"
                  // }
                  link={content?.additionalField}
                  image={
                    content.Icon
                      ? `https://lionfish-app-98urn.ondigitalocean.app${content?.Icon[0]?.url}`
                      : "/Images/AgeCardOne.svg"
                  }
                  bgImage="/Images/AgeRangeOne.svg"
                  title={content?.Title}
                  body={
                    <p dangerouslySetInnerHTML={{ __html: content?.Body }} />
                  }
                  // body={content?.Body}
                />
              ))}
            </>
          ) : (
            <p>No Content data available</p>
          )}

          <Image
            src={AgeRangeArrow}
            alt="Kindi"
            className="w-[50px] h-[50px] -mx-3"
          />

          {data?.data?.AgeGroup?.Content &&
          data.data.AgeGroup.Content.length > 0 ? (
            <>
              {data.data.AgeGroup.Content.slice(1, 2).map((content, index) => (
                <AgeCard
                  // image={content?.Icon ? content?.Icon.url : "/Images/AgeCardOne.svg"}
                  key={index}
                  image={
                    content.Icon
                      ? `https://lionfish-app-98urn.ondigitalocean.app${content?.Icon[0]?.url}`
                      : "/Images/AgeCardOne.svg"
                  }
                  link={content?.additionalField}
                  bgImage="/Images/AgeRangeTwo.svg"
                  title={content?.Title || "Toddler"}
                  body={
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          content?.Body ||
                          "Fun learning activities for children approaching the beginning of their school careers; these activities will also appeal to toddlers and babies",
                      }}
                    />
                  }
                />
              ))}
            </>
          ) : (
            <p>No Content data available</p>
          )}

          <Image
            src={AgeRangeArrow}
            alt="Kindi"
            className="w-[50px] h-[50px] -mx-3"
          />

          {data?.data?.AgeGroup?.Content &&
          data.data.AgeGroup.Content.length > 0 ? (
            <>
              {data.data.AgeGroup.Content.slice(2, 3).map((content, index) => (
                <AgeCard
                  link={content?.additionalField}
                  // image={
                  //   content?.Icon ? content?.Icon.url : "/Images/AgeCardOne.svg"
                  // }
                  key={index}
                  image={
                    content.Icon
                      ? `https://lionfish-app-98urn.ondigitalocean.app${content?.Icon[0]?.url}`
                      : "/Images/AgeCardOne.svg"
                  }
                  bgImage="/Images/AgeRangeThree.svg"
                  title={content?.Title}
                  body={
                    <p dangerouslySetInnerHTML={{ __html: content?.Body }} />
                  }
                />
              ))}
            </>
          ) : (
            <p>No Content data available</p>
          )}
          <Image
            src={AgeRangeArrow}
            alt="Kindi"
            className="w-[50px] h-[50px] -mx-3"
          />
          {data?.data?.AgeGroup?.Content &&
          data.data.AgeGroup.Content.length > 0 ? (
            <>
              {data.data.AgeGroup.Content.slice(3, 4).map((content, index) => (
                <AgeCard
                  link={content?.additionalField}
                  // image={
                  //   content?.Icon ? content?.Icon.url : "/Images/AgeCardOne.svg"
                  // }
                  key={index}
                  image={
                    content.Icon
                      ? `https://lionfish-app-98urn.ondigitalocean.app${content?.Icon[0]?.url}`
                      : "/Images/AgeCardOne.svg"
                  }
                  bgImage="/Images/AgeRangeFour.svg"
                  title={content?.Title}
                  body={
                    <p dangerouslySetInnerHTML={{ __html: content?.Body }} />
                  }
                />
              ))}
            </>
          ) : (
            <p>No Content data available</p>
          )}
        </div>

        {/* Right Arrow Button */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 transform -translate-y-1/2 bg-[#6f6f6f] bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={() => handleScroll("right")}
          aria-label="Scroll Right"
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
