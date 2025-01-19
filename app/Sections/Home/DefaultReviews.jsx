"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function DefaultReviews() {
  const [data, setData] = useState(null); // Data from API
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current review index
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch("https://kindiadmin.up.railway.app/api/reviews?populate=*");
        if (!res.ok) throw new Error("Failed to fetch reviews");

        const responseData = await res.json();
        setData(responseData.data); // Update data state
        setError(null); // Clear error state
      } catch (err) {
        console.error(err);
        setError("Unable to load reviews. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchReviews();
  }, []);

  // Navigate to the next review
  const handleNext = () => {
    if (data && data.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };

  // Navigate to the previous review
  const handlePrev = () => {
    if (data && data.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + data.length) % data.length
      );
    }
  };

  // Navigate to a specific review using dots
  const handleDotClick = (index) => setCurrentIndex(index);

  // Render loading state
  if (loading) {
    return <p className="text-center text-white">Loading reviews...</p>;
  }

  // Render error state
  if (error) {
    return (
      <p className="text-center text-red-500">
        {error} {/* Display error message */}
      </p>
    );
  }

  // Render the reviews
  return (
    <>
      {data && data.length > 0 ? (
        <div
          className="flex flex-col gap-[20px] justify-center lg:py-6 items-center w-full"
          style={{
            backgroundColor: data[currentIndex]?.bgcolor || "#3f3a64",
            transition: "background-color 0.5s ease-in-out",
          }}
        >
          <div className="w-full py-6 lg:py-2 lg:px-4 cursor-pointer items-center justify-between flex flex-row gap-1 lg:gap-[20px]">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="w-[32px] h-[32px] hidden lg:flex justify-center items-center bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            {/* Review Content */}
            <div className="claracontainer w-full flex-col duration-150 animate-fade-in justify-center items-center inline-flex md:py-6 sm:py-4">
              <h2 className="text-3xl text-center font-fredoka font-bold md:text-2xl sm:text-xl">
                <span
                  className="text-center"
                  style={{
                    color: data[currentIndex]?.MainLineColor || "#FFFFFF",
                  }}
                >
                  {data[currentIndex]?.MainLine || "Line Not Available"}
                </span>
                <br />
                <span
                  className="text-center"
                  style={{
                    color: data[currentIndex]?.SecondLineColor || "#FFFFFF",
                  }}
                >
                  {data[currentIndex]?.SecondLine || "Line Not Available"}
                </span>
              </h2>
              <p
                className="text-lg text-white text-center md:text-base sm:text-sm"
                dangerouslySetInnerHTML={{
                  __html: data[currentIndex]?.Body || "No content available",
                }}
              /> 
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-[32px] h-[32px] hidden lg:flex justify-center items-center bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Dot Navigation */}
          <div className="flex mt-4 space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-red" : "bg-white"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-white">No reviews available.</p>
      )}
    </>
  );
}
