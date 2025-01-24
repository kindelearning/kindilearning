"use client";

import { useState } from "react";
import { Fallback } from "../[id]/page";

export default function ProductMedia({ gallery }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track the currently selected media
  if (!gallery || gallery.length === 0) {
    return <Fallback message="No images available" />;
  }

  // Current media item
  const currentMedia = gallery[currentIndex];

  return (
    <div className="flex w-full flex-col items-start justify-between">
      {/* Main Media Frame */}
      <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[400px] lg:max-h-[400px] mb-4">
        {currentMedia.mime.includes("image") ? (
          <img
            // src={currentMedia.url}
            src={`https://lionfish-app-98urn.ondigitalocean.app${currentMedia.url}`}
            alt={currentMedia.name || "Product Media"}
            // className="w-full h-auto object-cover  rounded-lg shadow-md"
          />
        ) : currentMedia.mime.includes("video") ? (
          <video controls className="w-full h-auto rounded-lg shadow-md">
            <source
              // src={currentMedia.url}
              src={`https://lionfish-app-98urn.ondigitalocean.app${currentMedia.url}`}
              type={currentMedia.mime}
            />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      {/* Thumbnail Tray */}
      <div className="flex gap-3 justify-start  overflow-x-scroll scrollbar-hidden">
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-lg cursor-pointer `}
            onClick={() => setCurrentIndex(index)}
          >
            {item.mime.includes("image") ? (
              <img
                src={`https://lionfish-app-98urn.ondigitalocean.app${item.url}`}
                // src={item.url}

                alt={item.name || "Thumbnail"}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : item.mime.includes("video") ? (
              <video className="w-full h-full object-cover rounded-lg pointer-events-none">
                <source
                  src={`https://lionfish-app-98urn.ondigitalocean.app${item.url}`}
                  // src={item.url}

                  type={item.mime}
                />
              </video>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
