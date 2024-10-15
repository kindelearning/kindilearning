import { EditForm, ImageInput } from "@/app/Sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default async function ProfileEdit() {
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
            <span className="text-red uppercase claraheading">Account</span>
          </div>

          <div className="claracontainer  lg:px-[144px] flex flex-col gap-8 justify-center items-center">
            <div className="flex w-full justify-center items-center">
              <ImageInput />
            </div>
            <div className="flex w-full justify-center items-center">
              <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
                <div className="claracontainer  w-full flex flex-col overflow-hidden gap-8">
                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="flex w-full">
                      type="name"
                      <Input
                        placeholder="Enter your name"
                        className="w-full focus-within:ring-0 focus-within:ring-offset-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                      />
                    </div>
                    <div className="flex flex-row w-full justify-between items-center gap-4">
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full focus-within:ring-0 focus-within:ring-offset-0 ring-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                      />
                      <Input
                        type="date"
                        placeholder="Date of Birth"
                        className="w-full focus-within:ring-0 focus-within:ring-offset-0 ring-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                      />
                    </div>
                    <div className="flex w-full">
                      <Input
                        type="name"
                        placeholder="Attending Nurury"
                        className="w-full focus-within:ring-0 focus-within:ring-offset-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                      />
                    </div>
                    <div className="flex w-full justify-center items-center">
                      <Button className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold font-['Fredoka'] leading-tight w-[200px] ">
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
