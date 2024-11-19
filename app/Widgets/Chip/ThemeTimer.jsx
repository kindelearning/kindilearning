"use client";

import React, { useState, useEffect } from "react";

export default function ThemeTimer({ targetDate = "2024-10-31" }) {
  const calculateRemainingTime = () => {
    const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
    const now = Date.now(); // Current time in milliseconds
    const remainingTime = targetTime - now; // Calculate remaining time in milliseconds

    // If time has passed, return 0
    return remainingTime > 0 ? remainingTime : 0;
  };

  const formatTime = (totalMilliseconds) => {
    if (totalMilliseconds <= 0) return "00d 00:00:00";

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId); // Stop the timer
          return 0; // Ensure it doesn't go below zero
        }
        return calculateRemainingTime(); // Update remaining time
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [targetDate]); // Depend on targetDate to recalculate when it changes

  return (
    <div className="w-auto max-w-[340px] h-auto bg-red rounded-full px-[16px] flex gap-[8px] items-center justify-between">
      <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
        <div className="w-[max-content] text-white text-[12px] md:text-[16px] font-normal font-fredoka leading-[28px]">
          Adventure Countdown:
        </div>
        <div className="w-[max-content] font-fredoka text-right text-white text-[12px] md:text-[18px] font-semibold leading-[32px]">
          {formatTime(remainingTime)}
        </div>
      </div>
    </div>
  );
}

// export default function ThemeTimer({ time = "12d 20:18:45" }) {
//   return (
//     <>
//       <div className="w-auto max-w-[340px] h-auto bg-red rounded-full px-[16px] flex gap-[8px] items-center justify-between">
//         <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
//           <div className="w-[max-content] text-white text-[12px] md:text-[16px] font-normal font-fredoka leading-[28px]">
//             Adventure Countdown:
//           </div>
//           <div className="w-[max-content] font-fredoka text-right text-white text-[12px] md:text-[18px] font-semibold leading-[32px]">
//             {time}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
