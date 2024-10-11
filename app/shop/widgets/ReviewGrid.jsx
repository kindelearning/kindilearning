import React from "react";
const review = {
  avatar: ThemeDummy,
  name: "John Doe",
  date: "2022-01-01",
  text: "This is a sample review.",
  rating: 4,
};
import { ReviewCard } from "..";
import { ThemeDummy } from "@/public/Images";

const ReviewGrid = () => {
  return (
    <>
      <div className="claracontainer py-2 flex scrollbar-hidden flex-row w-full gap-2 justify-start items-start overflow-x-scroll">
        <ReviewCard review={review} />
        <ReviewCard review={review} />
        <ReviewCard review={review} />
        <ReviewCard review={review} />
        <ReviewCard review={review} />
        <ReviewCard review={review} />
      </div>
    </>
  );
};

export default ReviewGrid;
