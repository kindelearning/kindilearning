"use client";

import { fetchDefaultReview } from "@/app/data/p/Home";
import { getDefaultReview } from "@/lib/hygraph";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const DefaultReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current review index

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchDefaultReview(); // Fetch data
      if (fetchedData) {
        setData(fetchedData); // Set the data if available
      } else {
        setError("Failed to fetch data");
      }
      setLoading(false); // Stop loading
    };

    loadData();
  }, []); // Empty dep

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Function to handle next navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.Content.length);
  };

  // Function to handle previous navigation
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + data.Content.length) % data.Content.length
    );
  };

  // Function to handle dot navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {data?.Content && data.Content.length > 0 && (
        <div
          className="flex flex-col gap-[20px] justify-center lg:py-6 items-center w-full"
          style={{
            backgroundColor: data.Content[currentIndex]?.bgcolor || "#3f3a64",
            transition: "background-color 0.5s ease-in-out",
          }}
        >
          <div
            className="w-full py-6 lg:py-2 lg:px-4 cursor-pointer items-center justify-between flex flex-row gap-1 lg:gap-[20px] transition-all duration-300 animate-fade-in"
            style={{
              backgroundColor: data.Content[currentIndex]?.bgcolor || "#3f3a64",
              transition: "background-color 0.5s ease-in-out",
            }}
          >
            <button
              onClick={handlePrev}
              className=" w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0  transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
            >
              <ChevronLeft />
            </button>
            <div className="claracontainer w-full flex-col duration-150 animate-fade-in justify-center items-center inline-flex md:py-6 sm:py-4">
              <h2
                className="text-3xl text-center font-fredoka duration-150 animate-fade-in font-bold md:text-2xl sm:text-xl"
                style={{
                  animation: "fadeIn 1s ease-in-out",
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-purple text-center">
                  {data.Content[currentIndex]?.featuredText && (
                    <p>{data.Content[currentIndex]?.featuredText}</p>
                  )}
                </p>
                <p className="text-white text-center">
                  {data.Content[currentIndex]?.Title && (
                    <p>{data.Content[currentIndex]?.Title}</p>
                  )}
                </p>
              </h2>
              <span
                className="text-lg text-white text-center md:text-base duration-150 animate-fade-in sm:text-sm"
                style={{
                  animation: "fadeIn 1s ease-in-out 0.5s",
                  animationFillMode: "forwards",
                }}
              >
                {data.Content[currentIndex]?.body && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.Content[currentIndex]?.body, // Render HTML content from rich text or Markdown
                    }}
                  />
                )}
              </span>
            </div>
            <button
              onClick={handleNext}
              className=" w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Dot Navigation */}
          <div className="flex mt-4 space-x-2">
            {data.Content.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-red" : "bg-[white]"
                } transition`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultReviews;
