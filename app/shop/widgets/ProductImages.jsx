"use client";

import Image from "next/image";
import React, { useState } from "react";

// const ProductImages = ({ images }) => {
const ProductImages = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(
    images && images.length > 0 ? images[0] : ""
  );

  return (
    <div className="flex claracontainer w-full gap-2 flex-col items-start">
      {/* Featured Image */}
      <div className="w-full rounded-[16px] overflow-clip max-h-[400px] ">
        <div className="flex w-full h-fit overflow-clip">
          <Image
            width={100}
            height={100}
            src={mainImage}
            className="lg:rounded-[16px] rounded-none lg:w-[600px] lg:h-[400px] object-cover lg:max-h-[400px] max-h-[320px] h-[300px] min-h-[300px] w-full"
            alt="Product Image"
          />
        </div>
      </div>
      <div className="flex max-w-[600px] w-full scrollbar-hidden overflow-y-hidden overflow-x-auto pt-4">
        <div className="flex flex-nowrap">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[100px] h-[80px] cursor-pointer border-2 border-transparent hover:scale-105 duration-150 mr-4 ${
                mainImage === image ? "border-red" : ""
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                width={100}
                height={80}
                className="object-cover w-full h-full rounded-[12px]"
                alt="Product Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
