import Image from "next/image";
import React from "react";

const ProductCard = ({ data }) => {
  const status = Math.random() < 0.5 ? "In Progress" : "In Progresss";
  const statusColor = status === "Completed" ? "#C42797" : "#ff8e00";

  return (
    <div className="max-w-[360px] max-h-[160px] flex flex-col justify-between p-4 items-center gap-6 bg-white rounded-xl">
      <div className="flex w-full flex-row justify-between items-center">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="h-auto w-full">
            <div className="w-full  text-[#757575] text-xs font-normal font-fredoka leading-none">
              {data.items} items
            </div>
            <div className="w-full text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
              ${data.price}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 justify-end w-full">
          <div
            className={`w-[100px] px-3 py-1 bg-[#fac17a] rounded-[88px] justify-center items-center gap-2 inline-flex`}
            // style={{ backgroundColor: statusColor }}
          >
            <div
              className={`text-center text-white text-[10px] font-normal font-fredoka leading-none`}
              
            >
              {status}
            </div>
          </div>
          <div className=" text-right text-[#757575] text-[10px] font-normal font-fredoka leading-none">
            {data.date}
          </div>
        </div>
      </div>

      <div className="w-full justify-start items-start gap-3 inline-flex">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="w-[32px] h-[32px] flex bg-[#fac17a] rounded-xl flex-row p-[4px]"
          >
            <Image
              src={image}
              alt="Product Image"
              className="w-[23px] h-[24px] text-red "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
