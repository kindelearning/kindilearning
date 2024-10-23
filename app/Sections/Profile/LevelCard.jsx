import React from "react";

const LevelCard = ({ level, activities, className }) => {
  return (
    <div
      className={`w-full px-4 py-6 bg-white rounded-xl flex-col justify-start items-start gap-[8px] inline-flex ${className}`}
    >
      <div className="text-[#0a1932] text-[20px] font-semibold font-fredoka leading-normal">
        {level}
      </div>
      <div className="text-[#0a1932] clarabodyTwo">
        {activities} Activities
      </div>
    </div>
  );
};
export default LevelCard;
