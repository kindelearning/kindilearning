import React, { useRef } from "react";
import { ReviewCard } from "..";
import { ThemeDummy } from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";

const review = {
  avatar: ThemeDummy,
  name: "John Doe",
  date: "2022-01-01",
  text: "This is a sample review.",
  rating: 4,
};

const ReviewGrid = () => {
  const scrollContainerRef = useRef(null);

  // Function to scroll right with smooth animation
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Function to scroll left with smooth animation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <>
      <div className="relative w-full flex gap-2">
        {/* Left Arrow */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </button>

        {/* Review Grid */}
        <div
          ref={scrollContainerRef}
          className="claracontainer py-2 flex scrollbar-hidden flex-row w-full gap-2 justify-start items-start overflow-x-scroll"
        >
          <ReviewCard review={review} />
          <ReviewCard review={review} />
          <ReviewCard review={review} />
          <ReviewCard review={review} />
          <ReviewCard review={review} />
          <ReviewCard review={review} />
        </div>

        {/* Right Arrow */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default ReviewGrid;
