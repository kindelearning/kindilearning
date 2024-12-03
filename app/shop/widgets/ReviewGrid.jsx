import React, { useRef, useState } from "react";
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
  // Function to scroll right with smooth animation
  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Function to scroll left with smooth animation
  const scrollmeLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
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
          onClick={scrollmeLeft}
        >
          <ChevronLeft />
        </button>

        {/* Review Grid */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
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
          onClick={scrollRight}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default ReviewGrid;
