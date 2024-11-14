"use client";

import { useEffect, useRef, useState } from "react";
import {
  ActivityCard,
  BlogThumb,
  HowItWorkVideo,
  ProfessionalThumb,
} from "@/public/Images";
import Image from "next/image";

export default function Claras3DGallery({
  images = [BlogThumb, ProfessionalThumb, HowItWorkVideo, ActivityCard],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartRef = useRef(null);
  const autoplayRef = useRef(null);

  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
    touchStartRef.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!dragging || !touchStartRef.current) return;

    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - touchStartRef.current;
    setDragOffset(deltaX);

    if (Math.abs(deltaX) > 100) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + (deltaX > 0 ? -1 : 1) + images.length) % images.length
      );
      touchStartRef.current = null;
      setDragOffset(0);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragOffset(0);
    touchStartRef.current = null;
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoplayRef.current);
  }, [images.length]);

  const getImageIndex = (index) => (currentIndex + index) % images.length;

  return (
    <div className="relative bg-[#523373] perspective-[1000px] w-[360px] lg:w-[400px] h-[500px] flex justify-center items-center overflow-hidden">
      {images.map((_, index) => {
        const imageIndex = getImageIndex(index);
        const isActive = index === 0;

        // Improved stacking and peeking effect
        const zIndexOffset = 20 - index;
        const translateYOffset = index * 25; // Slightly increased for better peeking
        const scaleValue = 1 - index * 0.05; // Gradually reduce size for depth
        const opacityValue = 1 - index * 0.15; // Gradually reduce opacity for depth
        const boxShadowValue = isActive
          ? "0px 8px 15px rgba(0, 0, 0, 0.5)"
          : "0px 4px 10px rgba(0, 0, 0, 0.3)";

        return (
          <div
            key={imageIndex}
            className={`absolute rounded-xl bg-[#523373] transition-transform duration-700 ease-in-out ${
              isActive ? "z-20" : "z-0"
            }`}
            style={{
              transform: `translateZ(-${index * 50}px) translateX(${
                isActive ? dragOffset : 0
              }px) translateY(${translateYOffset}px) scale(${scaleValue})`,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflow: "hidden",
              opacity: opacityValue,
              cursor: isActive ? "grab" : "default",
              zIndex: zIndexOffset,
              boxShadow: boxShadowValue,
              marginBottom: index !== 0 ? "-10px" : "0",
              marginRight: index !== 0 ? "-10px" : "0",
            }}
            onMouseDown={isActive ? handleDragStart : null}
            onTouchStart={isActive ? handleDragStart : null}
            onMouseMove={isActive ? handleDragMove : null}
            onTouchMove={isActive ? handleDragMove : null}
            onMouseUp={isActive ? handleDragEnd : null}
            onTouchEnd={isActive ? handleDragEnd : null}
          >
            <Image
              width={500}
              height={600}
              src={images[imageIndex].src || images[imageIndex]}
              alt={`gallery-image-${imageIndex}`}
              className="w-full h-full object-cover border-8 border-[white] rounded-xl transition-all duration-500 ease-in-out hover:scale-105 hover:opacity-90"
            />
          </div>
        );
      })}
    </div>
  );
}
