import { DeleteItem, ShopImage } from "@/public/Images";
import Image from "next/image";
import React from "react";
import { QuantityControl } from "../..";

const ProductChip = ({
  image,
  title = "Title",
  properties = "Size, Color",
  price = "99",
  quantity = "2",
}) => {
  return (
    <>
      <div className="flex gap-4 px-2 py-2 bg-white rounded-xl items-center shadow w-full border-gray-200">
        <Image
          alt="Kindi"
          src={image || ShopImage}
          width={120}
          height={90}
          className="w-[80px] h-[76px] md:w-[100px] lg:h-[80px] rounded-[12px]"
        />
        <div className="flex w-full justify-between items-start">
          <div className="flex flex-col w-full gap-1 md:gap-2">
            <h5 className="text-black text-lg font-fredoka font-medium leading-relaxed ">
              {title}
            </h5>
            <div className="text-[#757575] text-[12px] font-normal font-fredoka leading-none">
              {properties}
            </div>
          </div>
          <div className="flex flex-col justify-end items-end w-full gap-2">
            <div className="w-full text-red text-3xl text-end font-semibold font-fredoka capitalize leading-10">
              ${price}
            </div>
            <div className="w-full gap-[2px] flex">
              <Image alt="Kindi" src={DeleteItem} />
              <QuantityControl />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductChip;
