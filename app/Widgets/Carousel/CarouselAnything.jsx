"use client";
import React, { useState, useEffect } from "react";

const Carousel = ({ children, interval = 5000, slidesToShow = 4 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((c) => (c + 1) % children.length);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [children.length, interval, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="carousel-container overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-inner flex ">
        {children.map((child, index) => (
          <div
            key={index}
            className={`carousel-slide w-full md:w-1/${slidesToShow} xl:w-1/${slidesToShow} 2xl:w-1/${slidesToShow} absolute top-0 left-0 h-full ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
