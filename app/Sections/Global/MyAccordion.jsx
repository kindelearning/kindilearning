"use client";

import { useState } from "react";

export default function Accordion({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-[6px] duration-300 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-purple text-[20px] font-medium clarabodyTwo font-fredoka  ">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300 transition-max-height `}
        >
          ❯
        </span>
      </div>
      {isOpen && (
        <div className="pb-4 transition-max-height duration-500">
          <p className="clarabodyTwo text-[#7d7d7d]">{description}</p>
        </div>
      )}
    </div>
  );
}
