"use client";

import { getDefaultReview } from "@/lib/hygraph";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const DefaultReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current review index

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getDefaultReview();
      console.log("Default review data:", fetchedData);
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="bg-[#eaeaf5]">Loading...</div>;

  if (!data || data.length === 0)
    return <div className="bg-[#eaeaf5]">No data available</div>;

  // Function to handle next navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  // Function to handle previous navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  // Function to handle dot navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const currentReview = data[currentIndex];

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center w-full"
      style={{
        padding: "20px",
        backgroundColor: currentReview.bgColor?.hex || "#3f3a64",
        transition: "background-color 0.5s ease-in-out",
      }}
    >
      <section
        className="w-full py-6 cursor-pointer items-center justify-between flex flex-row gap-1 lg:gap-[20px] transition-all duration-300 animate-fade-in"
        style={{
          backgroundColor: currentReview.bgColor?.hex || "#3f3a64",
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        <button
          onClick={handlePrev}
          className="p-1 lg:p-2 lg:border-2 border-white rounded-full transition"
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
            <p className="text-purple text-center">{currentReview.titleOne}</p>
            <p className="text-white text-center">{currentReview.titleTwo}</p>
          </h2>
          <span
            className="text-lg text-white text-center md:text-base duration-150 animate-fade-in sm:text-sm"
            style={{
              animation: "fadeIn 1s ease-in-out 0.5s",
              animationFillMode: "forwards",
            }}
          >
            {currentReview.content}
          </span>
        </div>
        <button
          onClick={handleNext}
          className="p-1 lg:p-2 lg:border-2 border-white rounded-full transition"
        >
          <ChevronRight />
        </button>

       
      </section>
      {/* Dot Navigation */}
      <div className="flex mt-4 space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-400"
            } transition`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultReviews;
