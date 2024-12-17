import { PricingThumb } from "@/public/Images";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AccordianList from "./AccordianList";

export default function PricingCard({
  image,
  title = "Family",
  description,
  price,
  duration,
  pricingDetails,
  isOpen = false,
  paymentLink,
  toggleAccordion, // Receive the toggle function
}) {
  return (
    <div className="w-full min-w-[300px] md:min-w-[340px] lg:min-w-[300px] max-w-[360px] h-auto bg-[#ffffff] rounded-[32px] items-start justify-center flex flex-col gap-[20px] ">
      <div className="flex w-full rounded-t-[32px] h-full min-h-[260px] max-h-[260px] object-cover overflow-clip">
        <Image
          width={600}
          height={300}
          src={image || PricingThumb}
          alt="Pricing Image"
          className="min-h-[260px] object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-normal items-start px-4 py-8">
        <div className="flex flex-col gap-6 justify-normal items-start px-0">
          <div className="flex flex-col justify-between gap-4 items-start">
            <div className="text-[#3f3a64] text-[28px] lg:text-[30px] leading-[30px] lg:leading-[32px] font-semibold font-fredoka capitalize ">
              {title}
            </div>
            <div className="text-[#3f3a64] h-[240px] clarabodyTwo font-montserrat">
              {description}
            </div>
          </div>
          <div className="text-center text-red text-xl font-semibold font-fredoka leading-[16px]">
            Top Features
          </div>
          {isOpen && (
            <div className="w-full">
              <div className="w-full flex flex-col gap-2">
                {pricingDetails.map((detail, index) => (
                  <AccordianList
                    key={detail.id}
                    text={detail.title}
                    help={detail.helpText}
                    isActive={detail.isActive}
                  />
                ))}
              </div>
            </div>
          )}
          <button
            className="bg-[#f05c5c00] cursor-pointer hover:bg-[#f05c5c00] items-center rounded-[32px] flex py-0 px-0 "
            onClick={(e) => {
              e.preventDefault(); // Prevent default action
              toggleAccordion(); // Call the toggle function
            }}
          >
            <div className="w-[max-content]  cursor-pointer text-[#3f3a64] text-sm text-start font-bold font-fredoka uppercase leading-10">
              {isOpen ? "Discover Less" : "Discover More"}
            </div>
            {isOpen ? (
              <ChevronUp className="text-[#3f3a64]" />
            ) : (
              <ChevronDown className="text-[#3f3a64]" />
            )}
          </button>
        </div>
        <div className="flex w-full flex-row justify-between gap-4 items-center px-0">
          <Link target="_blank" href={paymentLink}>
            <Button className="bg-red hover:bg-purple py-2 px-6 rounded-[12px] text-white clarabutton hover:border-2 hover:border-white hover:shadow-sm  clarabutton">
              Get Started
            </Button>
          </Link>
          <p className="text-4xl flex flex-col justify-end items-end font-semibold font-fredoka text-end text-red">
            {price}
            <span className="text-center text-[#3f3a64] text-[13px] font-normal font-montserrat leading-tight">
              {duration}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
