"use client";

import { cardData, options, progressData } from "@/app/constant/menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  progressImage01,
  progressImage02,
  progressImage03,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { getPublishedMileStone } from "@/lib/hygraph";
import { PopupFooter } from "@/app/Sections";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * @Main_account_Credentials
 */
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      name
      username
      email
      profilePicture {
        url
      }
      isVerified
    }
  }
`;

const ProfileRoute = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

  // Function to go to the previous item
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? progressData.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === progressData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { id, icon, title, backgroundColor } = progressData[currentIndex]; // Get current data

  return (
    <div className="w-full lg:max-w-[340px] cursor-pointer px-4 py-3 gap-2 bg-white rounded-[12px] justify-between items-center inline-flex">
      <ChevronLeft
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handlePrevious}
      />
      <div className="flex w-[max-content] items-center gap-[12px]">
        <div
          className="w-[24px] flex justify-center items-center h-[24px] rounded-[4px]"
          style={{ backgroundColor: `#${backgroundColor}` }}
        >
          <Image alt={title} src={icon} className="w-[16px] h-[16px] p-[1px]" />
        </div>
        <div className="text-[#0a1932] w-[max-content] text-[14px] font-semibold font-fredoka leading-tight">
          {title || "Emotional & Social Strength"}
        </div>
      </div>
      <ChevronRight
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handleNext}
      />
    </div>
  );
};

// const NiceCurvePath = () => {
//   // Number of nodes
//   const numberOfNodes = 10;
//   const containerHeight = 800; // Height of the container
//   const nodeSpacing = containerHeight / (numberOfNodes - 1);
//   const baseAmplitude = 20; // Base amplitude for the wave
//   const frequency = 0.2; // Frequency of the wave

//   // State for container width
//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     // Set the container width after the component mounts
//     setContainerWidth(window.innerWidth);

//     // Optionally handle resizing
//     const handleResize = () => {
//       setContainerWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []); // Empty dependency array ensures this runs only once after mount

//   // Generate nodes and paths
//   const nodes = [];
//   const paths = [];

//   for (let i = 0; i < numberOfNodes; i++) {
//     // First node starts from the top center, rest alternate sides
//     const top = i * nodeSpacing;
//     const left =
//       i === 0
//         ? containerWidth / 2
//         : i % 2 === 0
//         ? containerWidth * 0.3
//         : containerWidth * 0.7; // First node at center, rest alternate

//     // Add node to nodes array
//     nodes.push(
//       <Milestone
//         key={i}
//         title={`Node ${i + 1}`}
//         bgColor="pink-500"
//         textColor="white"
//         borderColor="pink-700"
//       />
//     );

//     // Add path to paths array, skip the first node
//     if (i > 0) {
//       const previousTop = (i - 1) * nodeSpacing;
//       const previousLeft =
//         i === 1
//           ? containerWidth / 2
//           : i % 2 === 0
//           ? containerWidth * 0.7
//           : containerWidth * 0.3; // Opposite side of the current node

//       // Control points to make the curve bend at the nodes
//       const controlPointX1 =
//         previousLeft +
//         Math.sin(i * frequency) * (baseAmplitude + Math.random() * 10); // Adding randomness to the amplitude
//       const controlPointY1 =
//         previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 10; // Slight vertical variation
//       const controlPointX2 =
//         left - Math.sin(i * frequency) * (baseAmplitude + Math.random() * 10); // Adding randomness to the amplitude
//       const controlPointY2 =
//         previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 10; // Slight vertical variation

//       // Create a cubic Bezier curve using the 'C' command
//       const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

//       // Create a wider path by duplicating the path and applying a blur filter
//       paths.push(
//         <>
//           <path
//             key={`path-bg-${i}`} // Background path for width effect
//             d={pathD}
//             fill="none"
//             stroke="#f05c5c" // Set the stroke color to the preferred color
//             strokeWidth="10" // Wider stroke for background effect
//             opacity="0.5" // Slightly transparent for blending effect
//           />
//           <path
//             key={`path-${i}`}
//             d={pathD}
//             fill="none"
//             stroke="#f05c5c" // Set the stroke color to the preferred color
//             strokeWidth="4" // Standard stroke width for visibility
//             strokeDasharray="5,5" // Makes the path dotted
//           />
//         </>
//       );
//     }
//   }

//   return (
//     <div className="relative w-full h-full pb-24 min-h-[1000px] bg-gray-100 overflow-hidden">
//       {/* SVG for drawing paths */}
//       <svg
//         className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
//         viewBox={`0 0 ${containerWidth} ${containerHeight}`} // Set viewBox to full width of the viewport
//         preserveAspectRatio="none"
//       >
//         {paths}
//       </svg>
//       {nodes}
//     </div>
//   );
// };

const DisplayAllMileStone = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getPublishedMileStone();
        console.log("Fetched milestones:", data);
        setMilestones(data);
      } catch (err) {
        setError("Error fetching milestones.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);
  console.log("Milestones state:", milestones);

  if (!Array.isArray(milestones)) {
    return <p>Error: Expected milestones to be an array.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* <div>
        {milestones.length === 0 && <p>No milestones found.</p>}
        <div className="flex flex-wrap gap-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-col items-center">
              {milestone.thumbnail && (
                <img src={milestone.thumbnail.url} alt={milestone.title} />
              )}
              <h2 className="text-center">{milestone.title}</h2>
              <p>{milestone.description}</p>
            </div>
          ))}
        </div>
      </div> */}
      <CurvePath milestones={milestones} />
    </>
  );
};

const CurvePath = ({ milestones = [] }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
    const savedMessage = localStorage.getItem("milestoneMessage");
    if (savedMessage) {
      setMessage(savedMessage);
    }
  }, []);

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSave = () => {
    // Save the message to local storage
    localStorage.setItem("milestoneMessage", message);
    alert("Message saved successfully!");
  };

  // Dynamically set container height based on the number of nodes
  const nodeSpacing = 200; // Define the desired spacing between nodes
  const containerHeight = (milestones.length - 1) * nodeSpacing + 300; // Increased padding for better layout
  const baseAmplitude = 40; // Double the base amplitude for a larger curve
  const frequency = 0.2; // Frequency of the wave

  // State for container width
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set the container width after the component mounts
    setContainerWidth(window.innerWidth);

    // Optionally handle resizing
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  // Loop through milestones data
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];

    // Position calculation:
    // - Center the first and last nodes
    // - Alternate the others to the left and right
    const top = i * nodeSpacing;
    const left =
      i === 0 || i === milestones.length - 1
        ? containerWidth / 2 // Center for first and last nodes
        : i % 2 === 0
        ? containerWidth * 0.3 // Left for even
        : containerWidth * 0.7; // Right for odd

    // Calculate button positioning adjustments
    const buttonTop = top + 60; // Adjust top spacing
    const buttonLeft = left - 110; // Adjust left spacing

    // Add node to nodes array
    nodes.push(
      <div
        key={milestone.id}
        style={{
          position: "absolute",
          top: `${buttonTop}px`,
          left: `${buttonLeft}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Dialog className="p-2 lg:p-4">
          <DialogTrigger>
            <button className="clarabutton bg-red px-4 py-2 hover:shadow text-white rounded hover:bg-hoverRed">
              {milestone.title}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
            <DialogHeader className="p-4">
              <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                <div className="text-[#0a1932] claraheading">
                  {milestone.title}
                </div>
                <div className="w-full text-[#4a4a4a] clarabodyTwo justify-center items-center">
                  {milestone.description}
                </div>
                <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                  <div className="text-[#757575] clarabodyTwo ">Date</div>
                  <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                    {currentDate}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                    <ChevronLeft className="w-[24px] h-[24px]" />
                    Back
                  </Button>
                </div>
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
                    Mark as Complete{" "}
                  </Button>
                </div>
              </section>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft =
        i - 1 === 0 || i - 1 === milestones.length - 1
          ? containerWidth / 2
          : (i - 1) % 2 === 0
          ? containerWidth * 0.3
          : containerWidth * 0.7; // Alternate positions

      // Control points to make the curve bend at the nodes
      const controlPointX1 =
        previousLeft +
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY1 =
        previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 20;
      const controlPointX2 =
        left -
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY2 =
        previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 20;

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${milestone.id}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeWidth="4"
          strokeDasharray="5,5" // Dotted line
        />
      );
    }
  }

  return (
    <div
      className="relative w-full h-full pb-24 bg-gray-100 overflow-hidden"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>
      {nodes}
    </div>
  );
};

const MobileCurvePath = ({ milestones }) => {
  // Number of nodes is now based on the milestones length
  const numberOfNodes = milestones.length;
  const containerHeight = 800; // Height of the container
  const nodeSpacing = containerHeight / (numberOfNodes - 1);
  const baseAmplitude = 40; // Double the base amplitude for a larger curve
  const frequency = 0.2; // Frequency of the wave

  // State for container width
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set the container width after the component mounts
    setContainerWidth(window.innerWidth);

    // Optionally handle resizing
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  for (let i = 0; i < numberOfNodes; i++) {
    const milestone = milestones[i]; // Use milestone data

    // First node starts from the top center, rest alternate sides
    const top = i * nodeSpacing;
    const left =
      i === 0
        ? containerWidth / 2
        : i % 2 === 0
        ? containerWidth * 0.3
        : containerWidth * 0.7; // First node at center, rest alternate

    // Add node to nodes array
    nodes.push(
      <div
        key={milestone.id}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          onClick={() => alert(`Button for ${milestone.title} clicked!`)}
        >
          {milestone.title}
        </button>
      </div>
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft =
        i === 1
          ? containerWidth / 2
          : i % 2 === 0
          ? containerWidth * 0.7
          : containerWidth * 0.3; // Opposite side of the current node

      // Control points to make the curve bend at the nodes
      const controlPointX1 =
        previousLeft +
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20); // Increased amplitude and added randomness
      const controlPointY1 =
        previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 20; // Slightly larger vertical variation
      const controlPointX2 =
        left -
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20); // Increased amplitude and added randomness
      const controlPointY2 =
        previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 20; // Slightly larger vertical variation

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${milestone.id}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c" // Set the stroke color to the preferred color
          strokeWidth="4" // Slightly thicker stroke for visibility
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
        viewBox={`0 0 ${containerWidth} ${containerHeight}`} // Set viewBox to full width of the viewport
        preserveAspectRatio="none"
      >
        {paths}
      </svg>
      {nodes}
    </div>
  );
};

// const SineWaveWithButtons = () => {
//   const [containerWidth, setContainerWidth] = useState(0);
//   const amplitude = 100; // Controls the height of the wave
//   const frequency = 0.01; // Controls the frequency of the wave
//   const numPoints = 30; // Number of buttons/nodes to display
//   const waveLength = 800; // Width to generate the wave over

//   useEffect(() => {
//     setContainerWidth(window.innerWidth);

//     const handleResize = () => {
//       setContainerWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const generateWavePoints = () => {
//     const points = [];
//     const spacing = waveLength / (numPoints - 1);

//     for (let i = 0; i < numPoints; i++) {
//       const x = i * spacing;
//       const y = amplitude * Math.sin(frequency * x); // Adjust frequency & amplitude
//       points.push({ x, y: y }); // Use negative y to reflect wave on -y axis
//     }

//     return points;
//   };

//   const points = generateWavePoints();

//   return (
//     <div className="relative w-full h-[400px] bg-gray-100">
//       <svg
//         className="absolute w-full h-full"
//         viewBox={`0 -150 ${waveLength} 300`}
//         preserveAspectRatio="none"
//       >
//         {/* Drawing the sine wave */}
//         <path
//           d={`
//             M ${points[0].x} ${points[0].y}
//             ${points
//               .slice(1)
//               .map((point) => `L ${point.x} ${point.y}`)
//               .join(" ")}
//           `}
//           fill="none"
//           stroke="#f05c5c"
//           strokeWidth="4"
//         />
//       </svg>

//       {/* Adding buttons at the sine wave nodes */}
//       {points.map((point, index) => (
//         <div
//           key={index}
//           style={{
//             position: "absolute",
//             top: `calc(50% + ${point.y}px)`, // Centered vertically, then offset by sine y-value
//             left: `${point.x}px`,
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <button
//             className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
//             onClick={() => alert(`Button ${index + 1} clicked!`)}
//           >
//             Node {index + 1}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

export default function MileStone() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.email);
    }
  }, [session]);

  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      setProfileData(data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <>
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* <UserImages /> */}
          <div className="flex w-full flex-col justify-center items-center">
            <div className="flex w-full h-[160px] flex-row justify-center gap-0 items-center relative">
              <Image
                alt="Kindi"
                src={progressImage01}
                className="cursor-pointer w-20 object-cover rounded-full border-2 border-white -mr-[32px] h-20"
              />
              {profileData ? (
                <Image
                  alt="Kindi"
                  src={profileData.profilePicture?.url}
                  width={100}
                  height={100}
                  className="cursor-pointer w-28 h-28 min-w-[100px] min-h-[100px] border-gradient-to-r from-pink-500 to-yellow-500 border-2 border-red rounded-full z-10"
                />
              ) : (
                <Image
                  alt="Kindi"
                  src={progressImage02}
                  width={100}
                  height={100}
                  className="cursor-pointer w-30 rounded-full border-2 border-white z-10 h-30"
                />
              )}
              <Image
                alt="Kindi"
                src={progressImage03}
                className="cursor-pointer w-20 -ml-[32px] h-20"
              />
            </div>
            {profileData ? (
              <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                {profileData.name}
              </div>
            ) : (
              <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                Jacob
              </div>
            )}
          </div>
          <ProfileRoute />
          <DisplayAllMileStone />
        </div>
      </section>
    </>
  );
}
