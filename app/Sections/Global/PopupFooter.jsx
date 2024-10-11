"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PopupFooter = ({ PrimaryText = "Next" }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <>
      <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
        <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
          <Button
            onClick={() => handleBackClick()}
            className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex"
          >
            <ChevronLeft className="w-[24px] h-[24px]" />
            Back
          </Button>
          <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
            {PrimaryText}
          </Button>
        </div>
      </section>
    </>
  );
};

export default PopupFooter;
