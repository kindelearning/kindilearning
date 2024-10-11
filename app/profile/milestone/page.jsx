"use client";

import { options } from "@/app/constant/menu";
import { GroupChip } from "@/app/shop";
import { Button } from "@/components/ui/button";
import {
  KindiHeart,
  progressImage01,
  progressImage02,
  progressImage03,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProfileRoute = ({ image, iconBackgroundColor = "#F05C5C", title }) => {
  return (
    <>
      <div className="w-full  lg:max-w-[340px] cursor-pointer px-4 py-3 gap-2 bg-white rounded-[12px] justify-between items-center inline-flex">
        <ChevronLeft className="w-[20px] h-[20px] text-red" />
        <div className="justify-start items-center w-full gap-[12px] flex">
          <div
            className="w-[24px] flex justify-center items-center h-[24px] rounded-[4px]"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            <Image
              alt="Kindi"
              src={image || KindiHeart}
              className="w-[16px] h-[16px] p-[1px]"
            />
          </div>
          <div className="text-[#0a1932] text-[14px] font-semibold font-fredoka leading-tight">
            {title || "Emotional & Social Strength"}
          </div>
        </div>
        <ChevronRight className="w-[20px] h-[20px] text-red" />
      </div>
    </>
  );
};
const MNode = ({
  mName = "Name",
  bgColor = "#029871",
  textColor = "#ffffff",
}) => {
  return (
    <>
      <div className="flex items-center">
        <div
          className={`w-4 h-4 rounded-full mr-2`}
          style={{
            backgroundColor: bgColor,
          }}
        />
        <Button
          className={`px-4 py-2 text-${textColor} rounded-lg`}
          style={{
            backgroundColor: bgColor,
          }}
        >
          {mName}
        </Button>
      </div>
    </>
  );
};

const CurvePath = () => {
  // Number of nodes
  const numberOfNodes = 10;
  const containerHeight = 800; // Height of the container
  const nodeSpacing = containerHeight / (numberOfNodes - 1);
  const containerWidth = 100; // Relative width for calculations (percentage)

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  for (let i = 0; i < numberOfNodes; i++) {
    // First node starts from top center, rest alternate sides
    const top = i * nodeSpacing;
    const left = i === 0 ? 50 : i % 2 === 0 ? 30 : 70; // First node at 50%, rest alternate

    // Add node to nodes array
    nodes.push(
      // <div
      //   key={i}
      //   className="absolute w-8 h-8 flex items-center justify-center bg-[#bebef7] rounded-full"
      //   style={{ top: `${top}px`, left: `${left}%` }}
      // >
      //   <button className="text-[#242b61]">{i + 1}</button>
      // </div>
      <MNode
        key={i}
        mName={`Node ${i + 1}`}
        bgColor="pink-500"
        textColor="white"
        borderColor="pink-700"

      />
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft = i === 1 ? 50 : i % 2 === 0 ? 70 : 30; // Opposite side of the current node

      // Control points to make the curve bend at the nodes
      const controlPointX1 = previousLeft; // Control point close to the previous node
      const controlPointY1 = previousTop + (top - previousTop) / 2; // Midway vertically
      const controlPointX2 = left; // Control point close to the current node
      const controlPointY2 = previousTop + (top - previousTop) / 2; // Midway vertically

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${i}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeDasharray="5,5" // Makes the path dotted
        />
      );
    }
  }

  return (
    <div className="relative w-full h-full pb-24 min-h-[1000px] bg-gray-100 overflow-hidden">
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>

      {/* Render nodes */}
      {nodes}
    </div>
  );
};

// const CurvePath = () => {
//   // Number of nodes
//   const numberOfNodes = 10;
//   const containerHeight = 800;
//   const containerWidth = 1102;
//   const curveHeight = containerHeight / (numberOfNodes / 2);

//   // Generate nodes and paths
//   const nodes = [];
//   const paths = [];

//   for (let i = 0; i < numberOfNodes / 2; i++) {
//     // Node positions
//     const top1 = i * curveHeight * 2;
//     const left1 = 0;
//     const top2 = top1 + curveHeight;
//     const left2 = containerWidth;

//     // Add nodes to nodes array
//     nodes.push(
//       <MNode
//         key={`node-${i * 2}`}
//         mName={`Node ${i * 2 + 1}`}
//         bgColor="pink-500"
//         textColor="white"
//         borderColor="pink-700"
//         style={{ position: "absolute", top: `${top1}px`, left: `${left1}px` }}
//       />
//     );
//     nodes.push(
//       <MNode
//         key={`node-${i * 2 + 1}`}
//         mName={`Node ${i * 2 + 2}`}
//         bgColor="pink-500"
//         textColor="white"
//         borderColor="pink-700"
//         style={{ position: "absolute", top: `${top2}px`, left: `${left2}px` }}
//       />
//     );

//     // Create a cubic Bezier curve using the 'C' command
//     const pathD = `M ${left1} ${top1} C ${left1} ${
//       top1 + curveHeight / 2
//     } ${left2} ${top2 - curveHeight / 2} ${left2} ${top2}`;

//     paths.push(
//       <path
//         key={`path-${i}`}
//         d={pathD}
//         fill="none"
//         stroke="#f05c5c"
//         stroke-width="3"
//         strokeDasharray="6,6"
//       />
//     );
//   }

//   return (
//     <div className="relative w-full h-full pb-24 min-h-[1000px] bg-gray-100 overflow-hidden">
//       {/* SVG for drawing paths */}
//       <svg
//         className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
//         viewBox={`0 0 ${containerWidth} ${containerHeight}`}
//         preserveAspectRatio="none"
//       >
//         {paths}
//       </svg>

//       {/* Render nodes */}
//       {nodes}
//     </div>
//   );
// };
const UserImages = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex w-full h-[160px] flex-row justify-center gap-0 items-center relative">
        <Image
          alt="Kindi"
          src={progressImage01}
          className="cursor-pointer w-20 -mr-[32px] h-20"
        />
        <Image
          alt="Kindi"
          src={progressImage02}
          className="cursor-pointer w-30 z-10 h-30"
        />
        <Image
          alt="Kindi"
          src={progressImage03}
          className="cursor-pointer w-20 -ml-[32px] h-20"
        />
      </div>
      <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
        Jacob
      </div>
    </div>
  );
};

const MileStone = () => {
  const milestones = [
    {
      name: "Milestone 1",
      bgColor: "green-500",
      textColor: "white",
    },
    {
      name: "Milestone 2",
      bgColor: "blue-500",
      textColor: "white",
    },
    {
      name: "Milestone 3",
      bgColor: "purple-500",
      textColor: "white",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <section className="w-full pb-24 h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          <UserImages />
          <ProfileRoute />
          <GroupChip
            options={options}
            selectedOption={selectedOption}
            onChange={handleOptionChange}
          />
          {/* Curved Path */}
          <div className="flex flex-col w-full px-4 rounded-md justify-center items-center">
            {/* <svg
              width="1332"
              height="232"
              viewBox="0 0 1332 232"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.91629 225C-6.00759 164.333 46.4811 57 327.827 113"
                stroke="#F05C5C"
                stroke-width="3"
                stroke-linejoin="round"
                strokeDasharray="2 8"
              />
              <circle cx="327.827" cy="113" r="10" fill="#F05C5C" />
            </svg>

            <MNode
              mName="Node 5"
              bgColor="pink-500"
              textColor="white"
              borderColor="pink-700"
              style={{
                position: "absolute",
                top: "109.471px",
                left: "227.691px",
              }}
            /> */}
            <CurvePath />
          </div>
        </div>
      </section>
    </>
  );
};

export default MileStone;

// {
//   milestones.map((milestone, index) => (
//     <div key={index} className="relative">
//       <MNode
//         mName={milestone.name}
//         bgColor={milestone.bgColor}
//         textColor={milestone.textColor}
//       />
//     </div>
//   ));
// }
