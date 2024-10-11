import { EditForm, ImageInput } from "@/app/Sections";
import React from "react";

const page = () => {
  return (
    <>
      <section className="w-full pb-24 h-auto bg-[#eaeaf5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile Edit
          </div>
        </div>
        <div className="claracontainer bg-[#eaeaf5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 md:m-12 px-4 py-6 rounded-xl md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          {/* Top Heading */}
          <div className="w-full  flex justify-center items-center text-center ">
            <span className="text-[#3f3a64] uppercase claraheading">My </span>
            <span className="text-red uppercase claraheading">
              Account
            </span>
          </div>

          {/* The Row Two */}
          <div className="claracontainer  lg:px-[144px] flex flex-col gap-8 justify-center items-center">
            {/* Image ROw */}
            <div className="flex w-full justify-center items-center">
              <ImageInput />
            </div>
            {/* Form */}
            <div className="flex w-full justify-center items-center">
              <EditForm />
            </div>
            {/* CTA */}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
