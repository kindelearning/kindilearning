"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images = [], video = null }) => {
  const [mainMedia, setMainMedia] = useState(
    images && images.length > 0 ? { type: "image", src: images[0] } : null
  );

  return (
    <div className="flex claracontainer w-full gap-2 flex-col items-start">
      {/* Featured Media */}
      <div className="w-full lg:rounded-[16px] rounded-none overflow-clip max-h-[400px] md:max-h-[500px]">
        <div className="flex w-full h-fit overflow-clip">
          {mainMedia?.type === "image" ? (
            <Image
              width={600}
              height={400}
              src={mainMedia.src}
              quality={100}
              className="lg:rounded-[16px] rounded-none lg:min-w-[600px] md:min-h-[400px] md:h-full lg:full lg:h-[500px] object-cover lg:max-h-[500px] max-h-[320px] h-[300px] min-h-[300px] w-full"
              alt="Product Image"
            />
          ) : mainMedia?.type === "video" ? (
            <video
              controls
              autoPlay
              loop
              muted
              className="lg:rounded-[16px] rounded-none lg:min-w-[600px] md:min-h-[400px] md:h-full lg:full lg:h-[500px] object-cover lg:max-h-[500px] max-h-[320px] h-[300px] min-h-[300px] w-full"
            >
              <source src={mainMedia.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>

      {/* Gallery */}
      <div className="flex max-w-full w-full scrollbar-hidden overflow-y-hidden overflow-x-auto pt-4">
        <div className="flex px-4 lg:px-0 flex-nowrap">
          {/* Render Image Thumbnails */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[100px] h-[80px] cursor-pointer border-2 border-transparent hover:scale-105 duration-150 mr-4 ${
                mainMedia?.src === image ? "border-red" : ""
              }`}
              onClick={() => setMainMedia({ type: "image", src: image })}
            >
              <Image
                src={image}
                width={100}
                height={80}
                className="object-cover w-full h-full rounded-[12px]"
                alt="Product Thumbnail"
              />
            </div>
          ))}

          {/* Render Video Thumbnail */}
          {video && (
            <div
              className={`w-[100px] h-[80px] cursor-pointer border-2 border-transparent hover:scale-105 duration-150 mr-4 ${
                mainMedia?.src === video ? "border-red" : ""
              }`}
              onClick={() => setMainMedia({ type: "video", src: video })}
            >
              <video
                muted
                className="object-cover w-full h-full rounded-[12px]"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
