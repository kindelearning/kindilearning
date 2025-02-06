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
      <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[500px] lg:max-h-[500px] mb-4">
        {currentMedia.mime.includes("image") ? (
          <img
            // src={currentMedia.url}
            src={`https://lionfish-app-98urn.ondigitalocean.app${currentMedia.url}`}
            alt={currentMedia.name || "Product Media"}
            className="w-full h-full rounded-lg max-h-[300px] lg:h-[500px] lg:max-h-[500px] object-cover "
            />
        ) : currentMedia.mime.includes("video") ? (
          <video controls className="w-full h-auto rounded-lg shadow-md">
            <source
              // src={currentMedia.url}
              className="w-full h-full rounded-lg max-h-[300px] lg:h-[500px] lg:max-h-[400px] object-cover "
              src={`https://lionfish-app-98urn.ondigitalocean.app${currentMedia.url}`}
              type={currentMedia.mime}
            />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      {/* Thumbnail Tray */}

      <div className="flex flex-row gap-3 justify-start w-full px-2 lg:px-0 overflow-x-scroll scrollbar-hidden">
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`min-w-20 min-h-16 max-w-20 max-h-16 rounded-lg cursor-pointer `}
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
                  // className="w-full h-full rounded-lg max-h-[300px] lg:h-[400px] lg:max-h-[400px object-cover rounded-lg"

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
