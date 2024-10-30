"use client";

import { ActivityBlack, ActivityCard } from "@/public/Images";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ThreeDGallery({
  images = [
    ParentwithKindi,
    ProfessionalThumb,
    HowItWorkVideo,
    ActivityBlack,
    ActivityCard,
  ],
}) {
  const [visibleImages, setVisibleImages] = useState(images);
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart(startY);
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    // Get the end position and determine if the drag distance exceeds threshold
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const dragDistance = endY - dragStart;

    // If dragged more than 100px, animate out and cycle images
    if (Math.abs(dragDistance) > 100) {
      // Slide off-screen animation
      setIsDragging(false);
      setTimeout(() => {
        setVisibleImages((prevImages) => {
          const [firstImage, ...restImages] = prevImages;
          return [...restImages, firstImage];
        });
      }, 300); // Timing aligned with CSS animation duration
    }
    setIsDragging(false);
    setDragStart(null);
  };

  return (
    <div className="relative w-[500px] h-[500px] overflow-hidden rounded-lg">
      {visibleImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-300 ${
            index === 0 && isDragging ? "translate-y-full opacity-0" : ""
          } ${index === 0 ? "z-30" : `z-${30 - index}`}`}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            className="object-cover cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
