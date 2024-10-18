"use client";

import { Input } from "@/components/ui/input";
import Banner from "./sections/Banner";
import CardGroup from "./widgets/CardGroup";
import { Ratings } from "@/public/Images";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { developmentAreas } from "../constant/menu";
import Link from "next/link";
import { getProducts } from "@/lib/hygraph";
import Image from "next/image";
import NotFound from "../not-found";
import { useEffect, useRef, useState } from "react";

function SearchInput({ value, onChange }) {
  return (
    <div className="flex w-full items-center bg-white rounded-full border border-gray-200">
      <span className="px-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <Input
        type="email"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
        className="w-full border-0 rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0   focus:border-0 focus-within:border-0 px-3 py-2"
      />
    </div>
  );
}

const MobileFilters = () => {
  return (
    <>
      <div className="claracontainer px-4 md:px-2 lg:px-4 w-full flex flex-col lg:hidden overflow-hidden gap-2">
        <div className="claracontainer p-0 w-full flex flex-col lg:hidden overflow-hidden gap-2"></div>
        <div className="flex w-full justify-between items-center gap-1">
          {/* sort */}
          <Drawer className="w-full flex justify-center items-center">
            <DrawerTrigger className="w-full">
              <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                Sort
              </Button>
            </DrawerTrigger>
            <DrawerContent className=" w-full justify-center overflow-clip h-[40vh] md:h-[40vh] items-center flex">
              <DrawerHeader className="w-full h-full md:h-fit">
                <DrawerDescription className="flex h-fit flex-col py-6 overflow-y-scroll justify-start items-start w-full gap-2">
                  <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
                    Sort By
                  </div>
                  {/* <Slider /> */}
                  <div className="flex flex-col gap-4 justify-start items-start">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Price -- Low to high
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Price -- High to Low
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Rating -- High to Low
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ratings -- Low to High
                      </label>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                <DrawerClose className="flex w-full justify-between items-center gap-2">
                  <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                    Submit
                  </Button>
                  <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {/* filter */}
          <Drawer className="w-full flex justify-center items-center">
            <DrawerTrigger className="w-full">
              <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                Filter
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-full justify-center overflow-clip h-[90vh] md:h-[60vh] items-center flex">
              <DrawerHeader className="w-full h-full md:h-fit">
                <DrawerDescription className="flex h-full md:h-fit flex-col py-6 overflow-y-scroll  justify-start items-start w-full gap-2">
                  <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
                    Price
                  </div>
                  <Slider />
                  <div className="flex flex-col gap-4 justify-start items-center">
                    <div className="flex flex-col justify-start items-start gap-2 w-full">
                      <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                        Learning Areas
                      </div>
                      {/* Badge */}
                      <div className="flex gap-2 flex-wrap">
                        {developmentAreas.map((area, index) => (
                          <Badge
                            key={index}
                            variant={index === 0 ? "filled" : "outline"}
                            className={`text-sm font-normal font-fredoka leading-tight ${
                              index === 0 ? "bg-[#3f3a64] text-white" : ""
                            }`}
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2 w-full">
                      <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                        Type of Toy
                      </div>
                      {/* Badge */}
                      <div className="flex gap-2 flex-wrap">
                        {developmentAreas.map((area, index) => (
                          <Badge
                            key={index}
                            variant={index === 0 ? "filled" : "outline"}
                            className={`text-sm font-normal font-fredoka leading-tight ${
                              index === 0 ? "bg-[#3f3a64] text-white" : ""
                            }`}
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2 w-full">
                      <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                        Skills
                      </div>
                      {/* Badge */}
                      <div className="flex gap-2 flex-wrap">
                        {developmentAreas.map((area, index) => (
                          <Badge
                            key={index}
                            variant={index === 0 ? "filled" : "outline"}
                            className={`text-sm font-normal font-fredoka leading-tight ${
                              index === 0 ? "bg-[#3f3a64] text-white" : ""
                            }`}
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2 w-full">
                      <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                        Learning Areas
                      </div>
                      {/* Badge */}
                      <div className="flex gap-2 flex-wrap">
                        {developmentAreas.map((area, index) => (
                          <Badge
                            key={index}
                            variant={index === 0 ? "filled" : "outline"}
                            className={`text-sm font-normal font-fredoka leading-tight ${
                              index === 0 ? "bg-[#3f3a64] text-white" : ""
                            }`}
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                <DrawerClose className="flex w-full justify-between items-center gap-2">
                  <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                    Submit
                  </Button>
                  <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ image, title, price }) => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    // Function to generate a random number between 3 and 4.8, rounded to 1 decimal place
    const generateRandomRating = () => {
      const min = 3;
      const max = 4.8;
      const randomRating = (Math.random() * (max - min) + min).toFixed(1);
      return randomRating;
    };

    setRating(generateRandomRating());
  }, []);

  return (
    <div className="flex max-w-[300px] min-w-[240px] w-full flex-col rounded-[24px] items-center gap-4 bg-white  hover:shadow-md">
      <div className="flex rounded-t-[24px] overflow-clip w-full">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full hover:scale-110 duration-300 h-[200px] md:h-[220px] rounded-t-[24px] object-cover"
        />
      </div>
      <div className="claracontainer flex flex-col justify-start items-center w-full gap-2">
        <div className="flex items-center  px-4 w-full justify-between gap-2">
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            $ {price || "29"}
          </h1>
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image
              alt="Kindi"
              src={Ratings}
              className="text-yellow-400 w-4 h-4"
            />
            <span className="text-right text-[#0a1932] clarabodyTwo">
              {rating}+
            </span>
          </div>
        </div>
        <h3 className="text-start text-[#0a1932] text-[10px] font-fredoka w-full px-4 pb-4 pt-2 text-base font-medium leading-[20px]">
          {title}
        </h3>
      </div>
    </div>
  );
};

const SidebarFilters = ({ onFilterChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const handleCheckboxChange = (priceRange) => {
    const newSelection = selectedPriceRange.includes(priceRange)
      ? selectedPriceRange.filter((range) => range !== priceRange)
      : [...selectedPriceRange, priceRange];
    setSelectedPriceRange(newSelection);
    onFilterChange(newSelection);
  };

  return (
    <div className="md:hidden lg:flex h-fit xl:flex hidden sticky top-0 max-w-[26%] flex-col px-4 py-6 gap-4 w-full items-start justify-start bg-[#ffffff] rounded-[24px] z-10">
      <div className="text-red text-[32px] font-semibold font-fredoka leading-[25px] tracking-wide">
        Filters
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-6 w-full">
        <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
          <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
            Price Filter
          </div>
          <div className="claracontainer flex flex-col justify-start items-start gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="under10"
                className="border-red"
                onChange={() => handleCheckboxChange("under10")}
              />
              <label
                htmlFor="under10"
                className="text-sm font-medium font-fredoka"
              >
                Under $10
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="10to20"
                className="border-red"
                onChange={() => handleCheckboxChange("10to20")}
              />
              <label
                htmlFor="10to20"
                className="text-sm font-medium font-fredoka"
              >
                $10 - $20
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="20to50"
                className="border-red"
                onChange={() => handleCheckboxChange("20to50")}
              />
              <label
                htmlFor="20to50"
                className="text-sm font-medium font-fredoka"
              >
                $20 - $50
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="above50"
                className="border-red"
                onChange={() => handleCheckboxChange("above50")}
              />
              <label
                htmlFor="above50"
                className="text-sm font-medium font-fredoka"
              >
                Above $50
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const otherFilters = () => {
  return (
    <>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Material
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wood
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Plastic
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Fabric
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Metal
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mixed
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Type of Toy
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Educational
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Musical
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Puzzles
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Building Blocks
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Soft Toy
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Color
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Multicolor
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Primary Color
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pastel Color
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Monochrome
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Soft Toy
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Educational Focus
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Emotional & Social Strength
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confidence & Independence
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Speech & Language
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Physical Agility
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Reading & Writing
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Discovering our World
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Creativity & Imagination
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Experiments & Math
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Skills{" "}
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Exploring the Seasons{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sensory Development{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mastering Feelings{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Gross Motor{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Social Play{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Problem-solving & Independence{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Creativity & Imagination
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Gross Motor{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
        <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
          Discounts and Offers{" "}
        </div>
        <div className="claracontainer flex flex-col justify-start items-start gap-2">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                On Sale{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Clearance{" "}
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-red" />
              <label
                htmlFor="terms"
                className="text-sm font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bundle Offers{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default async function ShopPage() {
  // const products = await getProducts();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (selectedRanges) => {
    const priceFiltered = products.filter((product) => {
      const price = product.salePrice;
      if (selectedRanges.includes("under10") && price < 10) return true;
      if (selectedRanges.includes("10to20") && price >= 10 && price <= 20)
        return true;
      if (selectedRanges.includes("20to50") && price > 20 && price <= 50)
        return true;
      if (selectedRanges.includes("above50") && price > 50) return true;
      return false;
    });

    setPriceFilteredProducts(priceFiltered);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );

    // Log the search term and filtered results
    console.log("Search Term:", term);
    console.log("Filtered Products:", filtered);

    setFilteredProducts(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.metaKey && event.key === "j") {
      event.preventDefault(); // Prevent the default action
      if (searchInputRef.current) {
        searchInputRef.current.focus(); // Focus the search input
      }
    }
  };
  useEffect(() => {
    // Set up the keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const shouldShowAllProducts = !searchTerm || searchTerm.trim() === "";

  if (!products || products.length === 0) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
  return (
    <>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <Banner />
        <CardGroup />
        {/* <MainFrame  /> */}
        <div className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-2  flex flex-col md:flex-row gap-[20px]">
          <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
            {/* Filter Column */}
            <SidebarFilters onFilterChange={handleFilterChange} />
            {/* the product Grid Column */}
            <div className="flex w-full flex-col justift-start items-start gap-[20px] md:gap-[28px]">
              <div className="flex flex-col w-full gap-2">
                <div className="flex w-full px-4 lg:px-0">
                  <SearchInput
                    ref={searchInputRef}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {/* Mobile Filters Button */}
                <MobileFilters />
              </div>

              {/* Display Filtered Products by Price */}
              {priceFilteredProducts.length > 0 && (
                <>
                  <div className="flex justify-between items-center lg:px-0 px-4 w-full">
                    <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
                      Filtered by Price
                    </span>
                  </div>
                  <div className="w-full lg:grid lg:grid-cols-3 pl-4 md:pl-2 lg:px-0 flex flex-row overflow-x-scroll scrollbar-hidden gap-2">
                    {priceFilteredProducts.map((product) => (
                      <div key={product.id} className="border">
                        <Link href={`/shop/${product.id}`} target="_blank">
                          <ProductCard
                            image={product.thumbnail.url}
                            title={product.title}
                            price={product.salePrice}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Display Filtered Products First */}
              {filteredProducts.length > 0 && !shouldShowAllProducts && (
                <>
                  <div className="flex justify-between items-center lg:px-0 px-4 w-full">
                    <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
                      Search Results
                    </span>
                  </div>
                  <div className="w-full lg:grid lg:grid-cols-3 pl-4 md:pl-2 lg:px-0 flex flex-row overflow-x-scroll scrollbar-hidden gap-2">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="border">
                        <Link href={`/shop/${product.id}`} target="_blank">
                          <ProductCard
                            image={product.thumbnail.url}
                            title={product.title}
                            price={product.salePrice}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Message if no matching products found */}
              {searchTerm && filteredProducts.length === 0 && (
                <div className="text-center clarabodyTwo text-red-500 ">
                  No matching products found. Here are some products you may
                  like:
                </div>
              )}

              {/* Display All Products Below */}
              <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full">
                <div className="flex justify-between items-center px-4 lg:px-0 w-full">
                  <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
                    Nature Critical thinking
                  </span>
                </div>
                {/* Display All Products Below if test no search term or filtered products */}
                {(shouldShowAllProducts || filteredProducts.length <= 1) && (
                  <div className="w-full lg:grid lg:grid-cols-3 pl-4 md:pl-2 lg:px-0 flex flex-row overflow-x-scroll scrollbar-hidden gap-2">
                    {products.map((product) => (
                      <div key={product.id} className="border">
                        <Link href={`/shop/${product.id}`} target="_blank">
                          <ProductCard
                            image={product.thumbnail.url}
                            title={product.title}
                            price={product.salePrice}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
