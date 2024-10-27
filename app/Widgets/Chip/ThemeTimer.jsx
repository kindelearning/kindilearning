"use client";

import React, { useState, useEffect } from "react";

const ThemeTimer = ({ Time = "12d 20:18:45" }) => {
  const [time, setTime] = useState(Time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const [days, timePart] = time.split("d ");
      const [hours, minutesSeconds] = timePart.split(":");
      const [minutes, seconds] = minutesSeconds.split(":");

      let sec = parseInt(seconds) - 1;
      let min = parseInt(minutes);
      let hr = parseInt(hours);
      let day = parseInt(days);

      if (isNaN(sec)) sec = 59;
      if (sec < 0) {
        sec = 59;
        min -= 1;
      }
      if (min < 0) {
        min = 59;
        hr -= 1;
      }
      if (hr < 0) {
        hr = 23;
        day -= 1;
      }

      setTime(
        `${day}d ${hr.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <>
      <div className="w-auto max-w-[340px] h-auto bg-red rounded-full px-[16px] flex gap-[8px] items-center justify-between">
        <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
          <div className="w-[max-content] text-white text-[12px] md:text-[16px] font-normal font-fredoka leading-[28px]">
            Adventure Countdown:
          </div>
          <div className="w-[max-content] font-fredoka text-right text-white text-[12px] md:text-[18px] font-semibold leading-[32px]">
            {time}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeTimer;
