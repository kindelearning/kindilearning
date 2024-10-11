"use client";

import { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3"];

function Chip({ children, active, onClick }) {
  return (
    <div
      className={`${
        active ? "bg-red  text-white" : "text-red bg-[white]"
      } px-4 py-1 rounded-full min-w-[max-content] cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

const GroupChip = ({ options, selectedOption, onChange }) => {
  return (
    <>
      <div className="flex overflow-x-scroll scrollbar-hidden space-x-2">
        {options.map((option, index) => (
          <Chip
            key={index}
            active={option === selectedOption}
            onClick={() => onChange(option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    </>
  );
};

export default GroupChip;
