"use client";

import { useEffect, useRef, useState } from "react";
import {
  ActivityCard,
  BlogThumb,
  HowItWorkVideo,
  ParentwithKindi,
  ProfessionalThumb,
} from "@/public/Images";
import Image from "next/image";

export default function Claras3DGallery({
  images = [
    BlogThumb,
    ParentwithKindi,
    ProfessionalThumb,
    HowItWorkVideo,
    ActivityCard,
  ],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef(null);
  const autoplayRef = useRef(null);

  // Function to handle dragging and slide effect
  const handleDragStart = (e) => {
    e.preventDefault();
    touchStartRef.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!touchStartRef.current) return;

    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = touchStartRef.current - currentX;

    if (Math.abs(deltaX) > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      touchStartRef.current = null;
    }
  };

  const handleDragEnd = () => {
    touchStartRef.current = null;
  };

  // Function to get the image index with circular behavior
  const getImageIndex = (index) => (currentIndex + index) % images.length;

  // Autoplay logic
  useEffect(() => {
    // Set autoplay to change the image every 3 seconds (3000ms)
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(autoplayRef.current);
  }, [images.length]);

  return (
    <div className="relative bg-[#523373] perspective-[1000px] w-[360px] lg:w-[400px] h-[500px] flex justify-center items-center overflow-hidden">
      {images.map((_, index) => {
        const imageIndex = getImageIndex(index);
        return (
          <div
            key={imageIndex}
            className={`absolute rounded-xl bg-[#523373] shadow-xl transition-all duration-700 ease-in-out transform ${
              index === 0 ? "z-20 scale-105 shadow-xl" : "z-0 opacity-60"
            }`}
            style={{
              transform: `translateZ(-${index * 50}px)`,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflow: "hidden",
              filter: index === 0 ? "brightness(0.8)" : "none",
              cursor: "grab",
              marginBottom: index !== 0 ? "-8px" : "0",
              marginRight: index !== 0 ? "-8px" : "0",
            }}
            onMouseDown={index === 0 ? handleDragStart : null}
            onTouchStart={index === 0 ? handleDragStart : null}
            onMouseMove={index === 0 ? handleDragMove : null}
            onTouchMove={index === 0 ? handleDragMove : null}
            onMouseUp={index === 0 ? handleDragEnd : null}
            onTouchEnd={index === 0 ? handleDragEnd : null}
            onDragEnd={index === 0 ? handleDragEnd : null}
          >
            {/* Image rendered as an <img> tag to handle object-fit */}
            <Image
              width={500}
              height={600}
              src={images[imageIndex].src || images[imageIndex]}
              alt={`gallery-image-${imageIndex}`}
              className="w-full h-full object-cover border-8 border-[white] rounded-xl overflow-clip transition-all duration-500 ease-in-out transform hover:scale-105 hover:opacity-90 hover:shadow-lg"
            />
          </div>
        );
      })}
    </div>
  );
}
