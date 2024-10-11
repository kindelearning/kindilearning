import { ShopBanner } from "@/public/Images";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-2 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer px-4 w-full flex flex-col overflow-hidden gap-8">
          <Image  alt="Kindi" 
            src={ShopBanner}
            className="w-full rounded-[12px] md:rounded-[24px] h-auto"
          />
        </div>{" "}
      </section>
    </>
  );
};

export default Banner;
