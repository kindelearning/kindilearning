import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";

const PopupNavigation = ({ PrimaryText = "Next", backtext = "Back" }) => {
  return (
    <>
      <section className="w-full h-auto  -top-2 sticky bottom-0 z-10 bg-[#ffffff00] items-center justify-center py-4 flex flex-row">
        <div className="claracontainer flex flex-row justify-between w-full items-center gap-4">
          <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-semibold font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
            <ChevronLeft className="w-[24px] h-[24px]" />
            {backtext}
          </Button>
          <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
            {PrimaryText}
          </Button>
        </div>
      </section>
    </>
  );
};

export default PopupNavigation;
