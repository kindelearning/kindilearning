"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, CircleHelp, Minus } from "lucide-react";
import { useState } from "react";

export default function AccordianList({
  text = "I am the List item",
  help = "This is the help text",
  isActive = false,
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipOpen((prev) => !prev);
  };
  return (
    <div className="flex w-full items-center flex-row justify-between gap-2">
      <div className="flex justify-start gap-2 items-center">
        <div
          className={`rounded-full flex justify-center items-center p-1 w-4 h-4 bg-${
            isActive ? "red" : "gray-400"
          }`}
        >
          <span className="w-3 h-3 flex justify-center items-center">
            {isActive ? (
              <Check className="w-3 h-3 text-[#ffffff] font-extrabold" />
            ) : (
              <Minus className="w-3 h-3 text-[#ffffff] font-extrabold" />
            )}
          </span>
        </div>
        <span className="text-sm clarabodyTwo">
          {text.length > 32 ? `${text.slice(0, 30)}...` : text}
        </span>
      </div>
      <TooltipProvider>
        <Tooltip
          side="left"
          align="center"
          open={isTooltipOpen}
          onOpenChange={setIsTooltipOpen}
        >
          <TooltipTrigger onClick={toggleTooltip}>
            <CircleHelp className="w-4 h-4 hover:text-black text-[#c4c4c4]" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] text-start shadow-md">
            <p>{help}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
