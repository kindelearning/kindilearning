"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const DayCircle = ({ day, left, isSelected, onClick }) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center gap-2 ${
        isSelected ? "bg-[#ef5c5c]" : "bg-[#f8f8f8]"
      } rounded-full`}
      onClick={onClick}
    >
      <div
        className={`w-6 text-center ${
          isSelected ? "text-[#ffffff]" : "text-[#3f3a64]"
        }  text-base font-semibold font-fredoka leading-normal`}
      >
        {day}
      </div>
    </div>
  );
};

const NurseryDaysComponent = () => {
  const [selectedDays, setSelectedDays] = useState({});

  const handleDaySelect = (day) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 gap-4 flex flex-col justify-center items-start">
      <div className="flex w-full justify-between items-center">
        <div className="flex w-full flex-col justify-start items-start gap-[2px]">
          <div className="text-[#757575] w-[max-content] text-[10px] font-normal font-fredoka leading-none">
            Select Dates
          </div>
          <div className="w-[max-content] text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
            Nursery days
          </div>
        </div>
        <Button className="text-white text-xs font-semibold font-fredoka px-4 py-2 bg-[#029871] rounded-xl justify-end items-center">
          Sync Nursery
        </Button>
      </div>

      <div className="flex gap-1 w-full overflow-x-scroll scrollbar-hidden">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <DayCircle
            key={index}
            day={day}
            left={13 + index * 46}
            isSelected={selectedDays[day]}
            onClick={() => handleDaySelect(day)}
          />
        ))}
      </div>
    </div>
  );
};

const EditForm = () => {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer  w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="flex w-full">
              <Input
                type="name"
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
            <div className="flex w-full">
              <NurseryDaysComponent />
            </div>
            <div className="flex w-full justify-center items-center">
              <Button className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold font-['Fredoka'] leading-tight w-[200px] ">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditForm;
